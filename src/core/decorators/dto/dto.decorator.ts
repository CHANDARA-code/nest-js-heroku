import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsAlphanumeric,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsISO8601,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// ===========================================
// OPTIONAL
// ===========================================

export const IsOptionalBoolean          = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional(options), IsBoolean()); // prettier-ignore
export const IsOptionalNumber           = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional(options), IsNumber()); // prettier-ignore
export const IsOptionalString           = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional(options), IsString()); // prettier-ignore
export const IsOptionalUrl              = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional(options), IsUrl()); // prettier-ignore
export const IsOptionalEmail            = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional(options), IsEmail({}, { message: 'Please provide a valid email address.' })); // prettier-ignore
export const IsOptionalAlphanumeric = (options?: ApiPropertyOptions) =>
  applyDecorators(IsOptional(), ApiPropertyOptional(options), IsAlphanumeric());
export const IsOptionalEnum             = (e: any[], options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, enum: e, ...options }), IsEnum(e)); // prettier-ignore
export const IsOptionalIn               = (e: any[], options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, enum: e, ...options }), IsIn(e)); // prettier-ignore
export const IsOptionalISO8601          = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, format: 'date', ...options }), IsISO8601()); // prettier-ignore
export const IsOptionalDate             = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, format: 'date', ...options }), IsDate()); // prettier-ignore
export const IsOptionalDateString       = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, format: 'date-time', ...options }), IsDateString()); // prettier-ignore
export const IsOptionalArrayNumber      = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional({ type: Number, isArray: true, ...options }), IsArray(), IsNumber({}, { each: true })); // prettier-ignore
export const IsOptionalArrayString      = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, isArray: true, ...options }), IsArray(), IsString({ each: true })); // prettier-ignore
export const IsOptionalMilitaryTime     = (options?: ApiPropertyOptions) => applyDecorators(IsOptional(), IsMilitaryTime({ message: 'Please provide a valid military time. For instance, 17:00.' }), ApiPropertyOptional({ example: '08:00', ...options })); // prettier-ignore
export const IsOptionalMap = <T>(e: new () => T, options?: ApiPropertyOptions) =>
  applyDecorators(IsOptional(), Type(() => e) as any, ValidateNested({ each: true }), ApiProperty({ type: Map, ...options }));
export const IsOptionalArrayType        = <T>(e: new () => T, options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ValidateNested(), Type(() => e) as any, ApiProperty({ isArray: true, type: e, ...options })); // prettier-ignore
export const IsOptionalObject           = <T>(e: new () => T, options?: ApiPropertyOptions) => applyDecorators(IsOptional(), ValidateNested(), Type(() => e) as any, ApiPropertyOptional({ type: e, ...options })); // prettier-ignore

// ===========================================
// NOT EMPTY
// ===========================================

export const IsNotEmptyAlphanumeric = (options?: ApiPropertyOptions) =>
  applyDecorators(IsNotEmpty(), ApiProperty(options), IsAlphanumeric());
export const IsNotEmptyBoolean         = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty(options), IsBoolean()); // prettier-ignore
export const IsNotEmptyISO8601         = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty(options), IsISO8601()); // prettier-ignore
export const IsNotEmptyNumber          = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty(options), IsNumber()); // prettier-ignore
export const IsNotEmptyString          = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty(options), IsString()); // prettier-ignore
export const IsNotEmptyEmail           = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty(options), IsEmail({}, { message: 'Please provide a valid email address.' })); // prettier-ignore
export const IsNotEmptyEnum            = (e: any[], options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty({ type: String, enum: e, ...options }), IsEnum(e)); // prettier-ignore
export const IsNotEmptyIn              = (e: any[], options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty({ type: String, enum: e, ...options }), IsIn(e)); // prettier-ignore
export const IsNotEmptyDate            = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty({ type: String, format: 'date', ...options }), IsDate()); // prettier-ignore
export const IsNotEmptyDateString      = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty({ type: String, format: 'date-time', ...options }), IsDateString()); // prettier-ignore
export const IsNotEmptyArrayNumber     = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty({ type: Number, isArray: true, ...options }), IsArray(), IsNumber({}, { each: true })); // prettier-ignore
export const IsNotEmptyArrayString     = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ApiProperty({ type: String, isArray: true, ...options }), IsArray(), IsString({ each: true })); // prettier-ignore
export const IsNotEmptyMilitaryTime    = (options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), IsMilitaryTime({ message: 'Please provide a valid military time. For instance, 17:00.' }), ApiProperty({ example: '08:00', ...options })); // prettier-ignore
export const IsNotEmptyObject          = <T>(e: new () => T, options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), ValidateNested(), Type(() => e) as any, ApiProperty({ type: e, ...options })); // prettier-ignore
export const IsNotEmptyPhoneNumber     = (region: any, options?: ApiPropertyOptions) => applyDecorators(Transform(({ value }) => parsePhoneNumberFromString(value, 'KH')) as any, IsPhoneNumber(region), ApiProperty({ type: String, ...options })); // prettier-ignore
export const IsNotEmptyMap             = <T>(e: new () => T, options?: ApiPropertyOptions) => applyDecorators(IsNotEmpty(), Type(() => e) as any, ValidateNested({ each: true }), ApiProperty({ type: Map, ...options })); // prettier-ignore
export const IsNotEmptyArrayType       = <T>(e: new () => T, minSize = 1, options?: ApiPropertyOptions) => applyDecorators(ArrayMinSize(minSize), ValidateNested(), Type(() => e) as any, ApiProperty({ isArray: true, type: e, ...options })); // prettier-ignore
