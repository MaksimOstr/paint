import { Test } from '@nestjs/testing'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'
import { UserWithoutPassword } from 'src/shared/types/userWithoutPassword'
import { Prisma, PrismaClient, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { JwtService } from '@nestjs/jwt'
import { AwsS3Service } from 'src/awsS3/awsS3.service'
import { ConfigService } from '@nestjs/config'
import { NotFoundException } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import e from 'express'
import { mock } from 'node:test'
import { userSelect } from 'src/shared/selectors/user.select'
import { UpdateUserDto } from '../dto/updateUser.dto'
import { Multer } from 'multer'

describe('UserService', () => {
  jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword'),
    genSalt: jest.fn().mockResolvedValue('salt'),
  }))
  const jwtServiceMock = {
    signAsync: jest.fn().mockResolvedValue('mocked-access-token'),
  }

  const awsS3ServiceMock = {
    uploadSingleFile: jest.fn().mockResolvedValue('mocked-logo-path'),
  }

  let userService: UserService
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    prismaMock = mockDeep()

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        UserService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: AwsS3Service,
          useValue: awsS3ServiceMock,
        },
      ],
    }).compile()

    userService = moduleRef.get(UserService)
  })

  describe('createUser with password', () => {
    test('createUser', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        username: 'TestUser',
        password: '1212',
      }

      const mockUser: Partial<User> = {
        id: '1',
        username: createUserDto.username,
        role: ['USER'],
        email: createUserDto.email,
      }

      prismaMock.user.create.mockResolvedValue(mockUser as User)
      const result = await userService.createUser(createUserDto, 'LOCAL')

      expect(result).toEqual(mockUser)
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          password: expect.any(String),
          role: ['USER'],
          authMethod: 'LOCAL',
        },
        select: userSelect,
      })
    })

    test('createUser without password', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        username: 'TestUser',
      }

      const mockUser: Partial<User> = {
        id: '1',
        username: createUserDto.username,
        role: ['USER'],
        email: createUserDto.email,
      }

      prismaMock.user.create.mockResolvedValue(mockUser as User)
      const result = await userService.createUser(createUserDto, 'GOOGLE')

      expect(result).toEqual(mockUser)
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          password: null,
          role: ['USER'],
          authMethod: 'GOOGLE',
        },
        select: userSelect,
      })
    })
  })
  describe('findUserByIdOrEmail', () => {
    test('Call with correct args', async () => {
      const request = '12'
      const user: User = {
        id: request,
        email: 'test',
        username: 'Oleg',
        profileLogo: '',
        authMethod: 'LOCAL',
        role: ['USER'],
        password: '',
      }

      prismaMock.user.findFirst.mockResolvedValue(user)

      const result = await userService.findUserByIdOrEmail(request)

      expect(result).toEqual(user)
      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [{ email: request }, { id: request }],
        },
      })
    })

    test('Call with incorrect args', async () => {
      const request = 'invalidId'

      prismaMock.user.findFirst.mockResolvedValue(null)
      const result = await userService.findUserByIdOrEmail(request)

      expect(result).toBeNull()
      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [{ email: request }, { id: request }],
        },
      })
    })
  })

  describe('updateUserLogoAndUsername', () => {
    const user: UserWithoutPassword = {
      id: 'test',
      email: 'test@test.com',
      username: 'TestUser',
      authMethod: 'LOCAL',
      profileLogo: '',
      role: ['USER'],
    }
    test('Call without userLogo', async () => {
      const updateData: UpdateUserDto = {
        profileLogo: null,
        username: 'Oleg',
      }
      const result = await userService.updateUserLogoAndUsername(
        user,
        updateData,
      )
      prismaMock.user.update.mockResolvedValue(user as User)

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: {
          id: user.id,
          username: user.username,
        },
        data: {
          username: updateData.username,
          profileLogo: user.profileLogo,
        },
      })

      expect(awsS3ServiceMock.uploadSingleFile).toHaveBeenCalledTimes(0)
      expect(result.access_token).toEqual('mocked-access-token')
    })
    
    test('Call without userLogo', async () => {
      const updateData: UpdateUserDto = {
        profileLogo: 'mocked-logo-path' as null as Express.Multer.File,
        username: 'Oleg',
      }

      const result = await userService.updateUserLogoAndUsername(
        user,
        updateData,
      )

      prismaMock.user.update.mockResolvedValue(user as User)
      awsS3ServiceMock.uploadSingleFile.mockResolvedValue(updateData.profileLogo);


      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: {
          id: user.id,
          username: user.username,
        },
        data: {
          username: updateData.username,
          profileLogo: updateData.profileLogo,
        },
      })
      
      expect(awsS3ServiceMock.uploadSingleFile).toHaveBeenCalledTimes(1)
      expect(awsS3ServiceMock.uploadSingleFile).toHaveBeenCalledWith(updateData.profileLogo, user.id)
      expect(result.access_token).toEqual('mocked-access-token')
    })
  })
})
