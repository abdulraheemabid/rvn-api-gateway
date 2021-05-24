import { DefinitionResponseDTO, FormDTO, IdDTO, FormUpdateDTO, EntryResponseDTO, RecordDTO, RecordUpdateDTO, FormRelationDTO, FieldResponseDTO, GenericObject, FormFieldDTO, IApiResponseWrapper } from "@abdulraheemabid/rvn-nest-shared";
import { ApiProperty } from "@nestjs/swagger";

const _fieldProperties = {
    id: { type: "number" },
    name: { type: "string" },
    type: { type: "string" },
    required: { type: "boolean" },
    attributes: { type: "object" },
    validationRegex: { type: "string" },
    arrayValues: { type: "array", items: { type: "string" } },
}

export class API_DefinitionResponseDTO implements DefinitionResponseDTO {
    @ApiProperty() id: number;
    @ApiProperty() name: string;
    @ApiProperty({ type: "array", items: { properties: _fieldProperties } }) fields?;
    @ApiProperty() attributes?: GenericObject;
    @ApiProperty() createdOn?: Date;
    @ApiProperty() createdById?: number;
    @ApiProperty() updatedOn?: Date;
    @ApiProperty() updatedById?: number;
    @ApiProperty() deletedOn?: Date;
}
export class API_FormDTO implements FormDTO {
    @ApiProperty() name: string;
    @ApiProperty({ type: "array", items: { properties: { ..._fieldProperties, markDeleted: { type: "boolean" } } } }) fields;
    @ApiProperty() attributes?: GenericObject;
    request: any;
}
export class API_IdDTO implements IdDTO {
    @ApiProperty() id: number;
}
export class API_FormUpdateDTO implements FormUpdateDTO {
    formId: number;
    @ApiProperty() name?: string;
    @ApiProperty({ type: "array", items: { properties: { ..._fieldProperties, markDeleted: { type: "boolean" } } } }) fields;
    @ApiProperty() attributes?: GenericObject;
    request: any;
}
export class API_EntryResponseDTO implements EntryResponseDTO {
    @ApiProperty() id?: number;
    @ApiProperty() entry: any;
    @ApiProperty() attributes?: GenericObject;
    @ApiProperty() createdOn?: Date;
    @ApiProperty() createdById?: number;
    @ApiProperty() updatedOn?: Date;
    @ApiProperty() updatedById?: number;
    @ApiProperty() deletedOn?: Date;
}
export class API_RecordDTO implements RecordDTO {
    formId: number;
    @ApiProperty() entry: any;
    @ApiProperty() attributes?: GenericObject;
    request: any;
}
export class API_RecordUpdateDTO implements RecordUpdateDTO {
    formId: number;
    id: number;
    @ApiProperty() entry: any;
    @ApiProperty() attributes?: GenericObject;
    request: any;
}
export class API_FormRelationDTO implements FormRelationDTO {
    @ApiProperty() id: number;
    @ApiProperty() formId: number;
    @ApiProperty() relationType: "one-to-one" | "many-to-one";
    @ApiProperty() children: FormRelationDTO[];
    @ApiProperty() parent: FormRelationDTO;
}

export class API_ResponseNumber implements FormRelationDTO {
    @ApiProperty() id: number;
    @ApiProperty() formId: number;
    @ApiProperty() relationType: "one-to-one" | "many-to-one";
    @ApiProperty() children: FormRelationDTO[];
    @ApiProperty() parent: FormRelationDTO;
}

