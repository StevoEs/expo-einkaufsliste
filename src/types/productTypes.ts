export interface Produkt {
    id: string;
    name: string;
    preis: number;
    menge: number;
  }
  
  export interface ProductItemProps {
    item: Produkt;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    drag?: any; // Falls du eine Drag-Funktion verwendest
    isActive?: boolean;
  }
  
  export interface ProductListProps {
    produkte: Produkt[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  }
  