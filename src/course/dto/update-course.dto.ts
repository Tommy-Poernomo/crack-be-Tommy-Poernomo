import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;
}