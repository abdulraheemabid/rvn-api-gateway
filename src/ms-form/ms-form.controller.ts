import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { MsFormService } from './ms-form.service';
import { Request } from 'express';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_DefinitionResponseDTO, API_FormDTO, API_IdDTO, API_FormUpdateDTO, API_EntryResponseDTO, API_RecordDTO, API_RecordUpdateDTO, API_FormRelationDTO } from './ms-form.dto';

@Controller('forms')
export class MsFormController {

    constructor(private readonly service: MsFormService) { }
    //Forms

    @Get()
    @ApiOkResponse({ description: "Successfull", type: [API_DefinitionResponseDTO] })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Forms")
    async fetchAllForms(): Promise<API_DefinitionResponseDTO[]> {
        return await this.service.fetchAllForms();
    }

    @Get(":id")
    @ApiOkResponse({ description: "Successfull", type: API_DefinitionResponseDTO })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Forms")
    async fetchFormById(@Param("id", ParseIntPipe) id: number): Promise<API_DefinitionResponseDTO> {
        return await this.service.fetchFormById({ formId: id });
    }

    @Get(":id/direct-children")
    @ApiOkResponse({ description: "Successfull", schema: { type: 'array', items: { type: "number" } } })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Forms Relations")
    async fetchFormDirectChildren(@Param("id", ParseIntPipe) id: number): Promise<number[]> {
        return await this.service.fetchFormDirectChildren({ formId: id });
    }

    @Get("trees/all")
    @ApiOkResponse({ description: "Successfull", type: [API_FormRelationDTO] })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Forms Relations")
    async fetchAllFormTrees(): Promise<API_FormRelationDTO[]> {
        return await this.service.fetchAllFormTrees();
    }

    @Post()
    @ApiCreatedResponse({ description: "Successfull", type: API_IdDTO })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Forms")
    async createForm(@Body() payload: API_FormDTO, @Req() request: Request): Promise<API_IdDTO> {
        payload.request = request;
        return await this.service.createForm(payload);
    }

    @Patch(":id")
    @ApiOkResponse({ description: "Successfull", type: API_IdDTO })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Forms")
    async updateForm(@Param("id", ParseIntPipe) id: number, @Body() payload: API_FormUpdateDTO, @Req() request: Request): Promise<API_IdDTO> {
        payload.request = request;
        payload.formId = id;
        return await this.service.updateForm(payload);
    }

    @Delete(":id")
    @ApiOkResponse({ description: "Successfull", type: API_IdDTO })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Forms")
    async deleteForm(@Param("id", ParseIntPipe) id: number): Promise<API_IdDTO> {
        return await this.service.deleteForm({ formId: id });
    }


    //Records
    @Get(":formId/record")
    @ApiOkResponse({ description: "Successfull", type: [API_EntryResponseDTO] })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiQuery({ name: 'parentId', type: "number", required: false })
    @ApiTags("Records")
    async fetchAllRecords(
        @Param("formId", ParseIntPipe) formId: number,
        @Query("parentId", new DefaultValuePipe(-1), ParseIntPipe) parentId?: number): Promise<API_EntryResponseDTO[]> {
        if (parentId === -1) parentId = null;
        return await this.service.fetchAllRecords({ formId, parentRecordId: parentId });
    }

    @Get(":formId/record/:recordId")
    @ApiOkResponse({ description: "Successfull", type: API_EntryResponseDTO })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Records")
    async fetchARecordById(@Param("formId", ParseIntPipe) formId: number, @Param("recordId", ParseIntPipe) recordId: number): Promise<API_EntryResponseDTO> {
        return await this.service.fetchARecordById({ formId, recordId });
    }

    @Post(":formId/record")
    @ApiCreatedResponse({ description: "Successfull", type: API_IdDTO })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Records")
    async createRecord(@Param("formId", ParseIntPipe) formId: number, @Body() payload: API_RecordDTO, @Req() request: Request): Promise<API_IdDTO> {
        payload.request = request;
        payload.formId = formId;
        return await this.service.createRecord(payload);
    }

    @Patch(":formId/record/:recordId")
    @ApiOkResponse({ description: "Successfull", type: API_IdDTO })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiTags("Records")
    async updateRecord(@Param("formId", ParseIntPipe) formId: number, @Param("recordId", ParseIntPipe) recordId: number, @Body() payload: API_RecordUpdateDTO, @Req() request: Request): Promise<API_IdDTO> {
        payload.id = recordId;
        payload.request = request;
        payload.formId = formId;
        return await this.service.updateRecord(payload);
    }

    @Delete(":formId/record/:recordId")
    @ApiOkResponse({ description: "Successfull", type: API_IdDTO })
    @ApiInternalServerErrorResponse({ description: "Internal server error" })
    @ApiQuery({ name: 'parentId', type: "number", required: false })
    @ApiTags("Records")
    async deleteRecord(
        @Param("formId", ParseIntPipe) formId: number,
        @Param("recordId", ParseIntPipe) recordId: number,
        @Query("parentId", new DefaultValuePipe(-1), ParseIntPipe) parentId?: number): Promise<API_IdDTO> {
        return await this.service.deleteRecord({ formId, recordId, newParentIdForChildren: parentId });
    }
}