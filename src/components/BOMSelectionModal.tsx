/**
 * DO NOT TOUCH - BOM Selection Modal
 * This modal provides granular selection when adding items to BOM
 * Parent/child relationships, product types, and vendor classification
 * Functionality and UI design are COMPLETED - do not modify
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check, Package, Settings, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  type: "service" | "product" | "license";
  vendor: string;
  description?: string;
}

interface BOMSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  blockName: string;
  blockDescription: string;
  products: string[];
  onConfirm: (selections: SelectedItem[]) => void;
}

interface SelectedItem {
  id: string;
  name: string;
  type: "service" | "product" | "license";
  vendor: string;
  parentBlock: string;
}

const productTypeIcons = {
  service: Settings,
  product: Package,
  license: Building2,
};

const productTypeLabels = {
  service: "Managed Service",
  product: "Hardware/Software Product",
  license: "Software License",
};

// Parse product strings to structured products
const parseProducts = (products: string[], blockName: string): Product[] => {
  return products.map((product, index) => {
    // Try to extract vendor and product info
    const isService = product.toLowerCase().includes("service") || 
                      product.toLowerCase().includes("managed") ||
                      product.toLowerCase().includes("support");
    const isLicense = product.toLowerCase().includes("license") ||
                      product.toLowerCase().includes("subscription");
    
    const type: "service" | "product" | "license" = isService ? "service" : isLicense ? "license" : "product";
    
    // Common vendor detection
    const vendors = ["Dell", "IBM", "Microsoft", "CrowdStrike", "Palo Alto", "Cisco", "VMware", 
                     "Tenable", "Qualys", "Rapid7", "Splunk", "AWS", "Azure", "Google", 
                     "ServiceNow", "Vanta", "Drata", "UiPath", "Snowflake", "Databricks"];
    let vendor = "ManageKube";
    for (const v of vendors) {
      if (product.toLowerCase().includes(v.toLowerCase())) {
        vendor = v;
        break;
      }
    }
    
    return {
      id: `${blockName}-${index}-${product.replace(/\s+/g, "-").toLowerCase()}`,
      name: product,
      type,
      vendor,
    };
  });
};

export const BOMSelectionModal = ({
  isOpen,
  onClose,
  blockName,
  blockDescription,
  products,
  onConfirm,
}: BOMSelectionModalProps) => {
  const parsedProducts = parseProducts(products, blockName);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemTypes, setItemTypes] = useState<Record<string, "service" | "product" | "license">>({});

  const toggleItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const setItemType = (productId: string, type: "service" | "product" | "license") => {
    setItemTypes((prev) => ({ ...prev, [productId]: type }));
  };

  const handleConfirm = () => {
    const selections: SelectedItem[] = selectedItems.map((id) => {
      const product = parsedProducts.find((p) => p.id === id)!;
      return {
        id: product.id,
        name: product.name,
        type: itemTypes[id] || product.type,
        vendor: product.vendor,
        parentBlock: blockName,
      };
    });
    onConfirm(selections);
    setSelectedItems([]);
    setItemTypes({});
    onClose();
  };

  const selectAll = () => {
    setSelectedItems(parsedProducts.map((p) => p.id));
  };

  const clearAll = () => {
    setSelectedItems([]);
    setItemTypes({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Package className="w-6 h-6 text-brand-orange" />
            Configure BOM Items
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Select specific products/services from <span className="font-semibold text-foreground">{blockName}</span>
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Parent Block Info */}
          <div className="bg-secondary p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-brand-orange/10 rounded flex items-center justify-center flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-brand-orange" />
              </div>
              <div>
                <p className="text-label text-muted-foreground mb-1">PARENT BLOCK</p>
                <p className="font-semibold text-foreground">{blockName}</p>
                <p className="text-sm text-muted-foreground mt-1">{blockDescription}</p>
              </div>
            </div>
          </div>

          {/* Selection Actions */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {selectedItems.length} of {parsedProducts.length} items selected
            </p>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-sm text-brand-orange hover:underline"
              >
                Select All
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={clearAll}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Products List */}
          <div className="space-y-3">
            {parsedProducts.map((product) => {
              const isSelected = selectedItems.includes(product.id);
              const currentType = itemTypes[product.id] || product.type;
              const TypeIcon = productTypeIcons[currentType];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-4 transition-all ${
                    isSelected
                      ? "border-brand-orange bg-brand-orange/5"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleItem(product.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        isSelected
                          ? "bg-brand-orange border-brand-orange"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </button>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{product.name}</p>
                        <span className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded">
                          {product.vendor}
                        </span>
                      </div>

                      {/* Type Selector - Only show when selected */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-border"
                          >
                            <p className="text-xs text-muted-foreground mb-2">
                              CLASSIFY AS:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {(Object.keys(productTypeLabels) as Array<"service" | "product" | "license">).map((type) => {
                                const Icon = productTypeIcons[type];
                                const isActive = currentType === type;
                                return (
                                  <button
                                    key={type}
                                    onClick={() => setItemType(product.id, type)}
                                    className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded transition-all ${
                                      isActive
                                        ? "bg-foreground text-white"
                                        : "bg-secondary text-muted-foreground hover:bg-muted"
                                    }`}
                                  >
                                    <Icon className="w-3 h-3" />
                                    {productTypeLabels[type]}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedItems.length === 0}
            className={`flex items-center gap-2 px-8 py-3 font-semibold transition-all ${
              selectedItems.length > 0
                ? "bg-brand-orange text-white hover:bg-opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Add {selectedItems.length} Item{selectedItems.length !== 1 ? "s" : ""} to BOM
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
