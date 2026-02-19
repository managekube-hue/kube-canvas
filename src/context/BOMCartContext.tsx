import { createContext, useContext, useState, ReactNode } from "react";

export interface BOMItem {
  id: string;
  name: string;
  type: "service" | "product" | "license";
  vendor: string;
  parentBlock: string;
}

interface BOMCartContextValue {
  items: BOMItem[];
  addItems: (newItems: BOMItem[]) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  count: number;
}

const BOMCartContext = createContext<BOMCartContextValue>({
  items: [],
  addItems: () => {},
  removeItem: () => {},
  clearCart: () => {},
  count: 0,
});

export const BOMCartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<BOMItem[]>([]);

  const addItems = (newItems: BOMItem[]) => {
    setItems(prev => {
      const existingIds = new Set(prev.map(i => i.id));
      const unique = newItems.filter(i => !existingIds.has(i.id));
      return [...prev, ...unique];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setItems([]);

  return (
    <BOMCartContext.Provider value={{ items, addItems, removeItem, clearCart, count: items.length }}>
      {children}
    </BOMCartContext.Provider>
  );
};

export const useBOMCart = () => useContext(BOMCartContext);
