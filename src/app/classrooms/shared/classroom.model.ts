import { Building } from '../../buildings/shared/building.model';

export class Classroom {
  id: number;
  size: number;
  identifier: string;
  type: string;
  building: Building;
}
