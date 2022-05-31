import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TreeSpeciesService } from './tree-species.service';
import { CreateTreeSpecDto } from './dto/create-tree-spec.dto';
import { UpdateTreeSpecDto } from './dto/update-tree-spec.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('tree-species')
export class TreeSpeciesController {
  constructor(private readonly treeSpeciesService: TreeSpeciesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Created Tree Species' })
  create(@Body() createTreeSpecDto: CreateTreeSpecDto) {
    return this.treeSpeciesService.create(createTreeSpecDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get all Tree Species' })
  findAll() {
    return this.treeSpeciesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Find single tree species by id' })
  findOne(@Param('id') id: string) {
    return this.treeSpeciesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Update single tree species' })
  update(
    @Param('id') id: string,
    @Body() updateTreeSpecyDto: UpdateTreeSpecDto,
  ) {
    return this.treeSpeciesService.update(+id, updateTreeSpecyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Delete a single tree species' })
  remove(@Param('id') id: string) {
    return this.treeSpeciesService.remove(+id);
  }
}
