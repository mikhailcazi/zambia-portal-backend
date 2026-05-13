import { Test, TestingModule } from '@nestjs/testing';
import { ProjectOwnerController } from './project-owner.controller';
import { ProjectOwnerService } from './project-owner.service';

describe('ProjectOwnerController', () => {
  let controller: ProjectOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectOwnerController],
      providers: [ProjectOwnerService],
    }).compile();

    controller = module.get<ProjectOwnerController>(ProjectOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
