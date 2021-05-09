import { DefinitionResponseDTO, FormIdDTO, FormDTO, IdDTO, FormUpdateDTO, EntryResponseDTO, RecordIdDTO, RecordDTO, RecordUpdateDTO } from '@abdulraheemabid/rvn-nest-shared';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { MsFormService } from './ms-form.service';
import { Request } from 'express';

@Controller('forms')
export class MsFormController {

    constructor(private readonly service: MsFormService) { }

    //Forms

    @Get()
    async fetchAllForms(): Promise<DefinitionResponseDTO[]> {
        return await this.service.fetchAllForms();
    }

    @Get(":id")
    async fetchFormById(@Param("id", ParseIntPipe) id: number): Promise<DefinitionResponseDTO> {
        return await this.service.fetchFormById({ formId: id });
    }

    @Post()
    async createForm(@Body() payload: FormDTO, @Req() request: Request): Promise<IdDTO> {
        payload.request = request;
        return await this.service.createForm(payload);
    }

    @Patch(":id")
    async updateForm(@Param("id", ParseIntPipe) id: number, @Body() payload: FormUpdateDTO, @Req() request: Request): Promise<IdDTO> {
        payload.request = request;
        payload.formId = id;
        return await this.service.updateForm(payload);
    }

    @Delete(":id")
    async deleteForm(@Param("id", ParseIntPipe) id: number): Promise<IdDTO> {
        return await this.service.deleteForm({ formId: id });
    }


    //Records
    @Get(":formId/record")
    async fetchAllRecords(@Param("formId", ParseIntPipe) formId: number): Promise<EntryResponseDTO[]> {
        return await this.service.fetchAllRecords({ formId });
    }

    @Get(":formId/record/:recordId")
    async fetchARecordById(@Param("formId", ParseIntPipe) formId: number, @Param("recordId", ParseIntPipe) recordId: number): Promise<EntryResponseDTO> {
        return await this.service.fetchARecordById({ formId, recordId });
    }

    @Post(":formId/record")
    async createRecord(@Param("formId", ParseIntPipe) formId: number, @Body() payload: RecordDTO, @Req() request: Request): Promise<IdDTO> {
        payload.request = request;
        payload.formId = formId;
        return await this.service.createRecord(payload);
    }

    @Patch(":formId/record/:recordId")
    async updateRecord(@Param("formId", ParseIntPipe) formId: number, @Param("recordId", ParseIntPipe) recordId: number, @Body() payload: RecordUpdateDTO, @Req() request: Request): Promise<IdDTO> {
        payload.id = recordId;
        payload.request = request;
        payload.formId = formId;
        return await this.service.updateRecord(payload);
    }

    @Delete(":formId/record/:recordId")
    async deleteRecord(@Param("formId", ParseIntPipe) formId: number, @Param("recordId", ParseIntPipe) recordId: number, @Query("newParentIdForChildren", ParseIntPipe) newParentIdForChildren: number): Promise<IdDTO> {
        return await this.service.deleteRecord({ formId, recordId, newParentIdForChildren });
    }
}
