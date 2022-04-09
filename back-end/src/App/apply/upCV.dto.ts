import { IsNotEmpty } from "class-validator";

export class UpCVDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cvURL: string;
}