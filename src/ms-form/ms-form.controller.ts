import { DefinitionResponseDTO, FormIdDTO, FormDTO, IdDTO, FormUpdateDTO, EntryResponseDTO, RecordIdDTO, RecordDTO, RecordUpdateDTO } from '@abdulraheemabid/rvn-shared';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MsFormService } from './ms-form.service';

@Controller('forms')
export class MsFormController {

    constructor(private readonly service: MsFormService) { }

    //Forms

    @Get()
    async fetchAllForms(): Promise<DefinitionResponseDTO[]> {
        return await this.service.fetchAllForms();
    }

    @Get(":id")
    async fetchFormById(@Param("id") id: number): Promise<DefinitionResponseDTO> {
        return await this.service.fetchFormById({ formId: id });
    }

    @Post()
    async createForm(@Body() payload: FormDTO): Promise<IdDTO> {
        return await this.service.createForm(payload);
    }

    @Patch(":id")
    async updateForm(@Param("id") id: number, @Body() payload: FormUpdateDTO): Promise<IdDTO> {
        payload.formId = id;
        return await this.service.updateForm(payload);
    }

    @Delete(":id")
    async deleteForm(@Param("id") id: number): Promise<IdDTO> {
        return await this.service.deleteForm({ formId: id });
    }


    //Records
    @Get(":formId/record")
    async fetchAllRecords(@Param("formId") formId: number): Promise<EntryResponseDTO[]> {
        return await this.service.fetchAllRecords({ formId });
    }

    @Get(":formId/record/:recordId")
    async fetchARecordById(@Param("formId") formId: number, @Param("recordId") recordId: number): Promise<EntryResponseDTO> {
        return await this.service.fetchARecordById({ formId, recordId });
    }

    @Post(":formId/record")
    async createRecord(@Param("formId") formId: number, @Body() payload: RecordDTO): Promise<IdDTO> {
        payload.formId = formId;
        return await this.service.createRecord(payload);
    }

    @Patch(":formId/record/:recordId")
    async updateRecord(@Param("formId") formId: number, @Body() payload: RecordUpdateDTO): Promise<IdDTO> {
        payload.formId = formId;
        return await this.service.updateRecord(payload);
    }

    @Delete(":formId/record/:recordId")
    async deleteRecord(@Param("formId") formId: number, @Param("recordId") recordId: number): Promise<IdDTO> {
        return await this.service.deleteRecord({ formId, recordId });
    }
}
