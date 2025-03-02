import { Produkt } from "./Produkt";

interface ProductListItemProps {
    item: Produkt;
    isActive: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onDragEnd: () => void;
    setActiveItemId: (id: string | null) => void;
  }