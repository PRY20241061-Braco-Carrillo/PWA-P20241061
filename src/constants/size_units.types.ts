import { z } from 'zod';

const SizeUnitType = z.enum(["PIECES", "GRAMS", "VOLUME", "DESCRIPTION"]);
export type SizeUnit = z.infer<typeof SizeUnitType>;
const SizeUnitSchema = SizeUnitType.enum;


const SizeByPieces = z.object({
  type: z.literal(SizeUnitSchema.PIECES),
  portion: z.number(),
  description: z.string(),
});

const WeightUnit = z.enum(["KG", "G"]);

const SizeByWeight = z.object({
  type: z.literal(SizeUnitSchema.GRAMS), 
  weight: z.number(), 
  unit: WeightUnit,
});

const VolumeUnit = z.enum(["L", "ML", "CM3", "IN3"]);

const SizeByVolume = z.object({
  type: z.literal(SizeUnitSchema.VOLUME), 
  volume: z.number(), 
  unit: VolumeUnit,
});

const SizeDescription = z.enum(["SMALL", "MEDIUM", "LARGE"]);

const SizeByDescription = z.object({
  type: z.literal(SizeUnitSchema.DESCRIPTION),
  description: SizeDescription,
});

export const SizeSchema = z.union([
  SizeByPieces,
  SizeByWeight,
  SizeByVolume,
  SizeByDescription,
]);


export type SizeInfo = z.infer<typeof SizeSchema>;

export interface TranslatableSize {
  type: SizeUnit;
  info: SizeInfo;
  unit?: string;
}