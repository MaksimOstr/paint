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
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import e from 'express'
import { mock } from 'node:test'
import { userSelect } from 'src/shared/selectors/user.select'
import { UpdateUserDto } from '../dto/updateUser.dto'
import { Multer } from 'multer'

describe('UserController', () => {
  let userServiceMock: DeepMockProxy<UserService>
  let userController: UserController

  beforeEach(async () => {
    userServiceMock = mockDeep<UserService>()

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: userServiceMock
      }],
    }).compile()

    userController = moduleRef.get(UserController)
  })

  describe('createUser', () => {
    test('if user is not exist', async () => {

        const data: CreateUserDto = {
            email: 'example@gmail.com',
            username: 'test',
            password: '1212'
        }

        const mockUser: UserWithoutPassword = {
            id: 'test',
            email: data.email,
            username: data.username,
            authMethod: 'LOCAL',
            profileLogo: '',
            role: ['USER']
        }

        jest.spyOn(userServiceMock, 'findUserByIdOrEmail').mockResolvedValue(null);
        jest.spyOn(userServiceMock, 'createUser').mockResolvedValue(mockUser);
        const result = await userController.createUser(data)

       expect(userServiceMock.createUser).toHaveBeenCalledWith(data)
       expect(result).toEqual(mockUser)
    })

    test('if user exists', async () => {

        const data: CreateUserDto = {
            email: 'example@gmail.com',
            username: 'test',
            password: '1212'
        }

        const mockUser: UserWithoutPassword = {
            id: 'test',
            email: data.email,
            username: data.username,
            authMethod: 'LOCAL',
            profileLogo: '',
            role: ['USER']
        }

        jest.spyOn(userServiceMock, 'findUserByIdOrEmail').mockResolvedValue(mockUser as User);
        
        try {
            await userController.createUser(data)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException)
            expect(userServiceMock.createUser).toHaveBeenCalledTimes(0)
        }
    })
  })

  describe('findUserByEmailOrId', () => {
    test('If user exists', async () => {
        const req = 'userId'
        const mockUser: UserWithoutPassword = {
            id: req,
            email: 'test',
            username: 'test',
            authMethod: 'LOCAL',
            profileLogo: '',
            role: ['USER']
        }

        userServiceMock.findUserByIdOrEmail.mockResolvedValue(mockUser as User)
        const result = await userController.findUserByEmailOrId(req)

        expect(result).toEqual(mockUser)
        expect(userServiceMock.findUserByIdOrEmail).toHaveBeenCalledWith(req)
        expect(userServiceMock.findUserByIdOrEmail).toHaveBeenCalledTimes(1)
    })
  })

  describe('updateUserLogoAndUsername', () => {
    test('updateUser', async () => {
        const access_token = 'mockToken'
        const mockData: Omit<UserWithoutPassword, 'authMethod'> = {
            id: 'test',
            email: 'example@gmail.com',
            profileLogo: '',
            role: ['USER'],
            username: 'test'
        }
        userServiceMock.updateUserLogoAndUsername.mockResolvedValue({ access_token })
        const result = await userController.updateUserLogoAndUsername('test' as unknown as Express.Multer.File, 'newUser', mockData)
        
        expect(result).toEqual({ access_token })
        expect(userServiceMock.updateUserLogoAndUsername).toHaveBeenCalledTimes(1)
    })
  })
 })
