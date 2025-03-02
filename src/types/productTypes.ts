import { Dispatch, SetStateAction } from 'react';

export interface Produkt {
    id: string;
    name: string;
    preis: number;
    menge: number;
  }
  
// productTypes.ts
export interface ProductItemProps {
  item: Produkt;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isActive: boolean; // Add isActive prop
  onDragEnd: (data: Produkt[]) => void; // Add onDragEnd prop
  setActiveItemId: (id: string | null) => void; // Add setActiveItemId prop
}
  
  export interface ProductListProps {
    produkte: Produkt[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    setProdukte: Dispatch<SetStateAction<Produkt[]>>;
  }
  