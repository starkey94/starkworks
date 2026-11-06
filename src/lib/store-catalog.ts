import { useEffect, useState } from "react";
import {
  Cable,
  Fence,
  Lamp,
  LampCeiling,
  Lightbulb,
  Package,
  PanelTop,
  Sun,
  Zap,
  ShieldCheck,
  Wrench,
  BatteryCharging,
  Cpu,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { whatsappLink } from "./site";

export type PriceDisplayMode = "both" | "retail" | "wholesale";

export interface StoreItem {
  id: string;
  name: string;
  category: "lighting" | "cables" | "solar" | "fittings" | "general";
  iconName: string;
  retailPrice: number | null;
  wholesalePrice: number | null;
  priceMode: PriceDisplayMode;
  unit: string;
  wholesaleMinQty: number;
  badge?: string;
  inStock: boolean;
  description?: string;
}

export const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb,
  Lamp,
  PanelTop,
  LampCeiling,
  Fence,
  Cable,
  Package,
  Sun,
  Zap,
  ShieldCheck,
  Wrench,
  BatteryCharging,
  Cpu,
  Layers,
};

export function getStoreIcon(iconName?: string): LucideIcon {
  if (iconName && ICON_MAP[iconName]) {
    return ICON_MAP[iconName];
  }
  return Package;
}

export const DEFAULT_STORE_ITEMS: StoreItem[] = [
  {
    id: "item-bulbs",
    name: "Bulbs",
    category: "lighting",
    iconName: "Lightbulb",
    retailPrice: 1500,
    wholesalePrice: 1200,
    priceMode: "both",
    unit: "piece",
    wholesaleMinQty: 10,
    badge: "Popular",
    inStock: true,
    description: "Energy-saving & long-lasting LED bulbs for domestic & commercial use.",
  },
  {
    id: "item-led-lights",
    name: "LED Lights",
    category: "lighting",
    iconName: "Lamp",
    retailPrice: 4500,
    wholesalePrice: 3800,
    priceMode: "both",
    unit: "piece",
    wholesaleMinQty: 5,
    badge: "Bestseller",
    inStock: true,
    description: "High-lumen LED battens and decorative light fittings.",
  },
  {
    id: "item-panel-lights",
    name: "Panel Lights",
    category: "lighting",
    iconName: "PanelTop",
    retailPrice: 3500,
    wholesalePrice: 2900,
    priceMode: "both",
    unit: "piece",
    wholesaleMinQty: 10,
    inStock: true,
    description: "Slim recessed and surface mount ceiling panel lights.",
  },
  {
    id: "item-pop-lights",
    name: "POP Lights",
    category: "lighting",
    iconName: "LampCeiling",
    retailPrice: 2500,
    wholesalePrice: 2000,
    priceMode: "both",
    unit: "piece",
    wholesaleMinQty: 10,
    inStock: true,
    description: "Spotlights and recessed warm/cool fixtures for POP ceilings.",
  },
  {
    id: "item-fence-lights",
    name: "Fence Lights",
    category: "lighting",
    iconName: "Fence",
    retailPrice: 9500,
    wholesalePrice: 8000,
    priceMode: "both",
    unit: "piece",
    wholesaleMinQty: 4,
    badge: "Outdoor Rated",
    inStock: true,
    description: "Weatherproof perimeter and gate pillar lighting solutions.",
  },
  {
    id: "item-cables",
    name: "Cables",
    category: "cables",
    iconName: "Cable",
    retailPrice: 24000,
    wholesalePrice: 21500,
    priceMode: "both",
    unit: "coil",
    wholesaleMinQty: 3,
    badge: "Pure Copper",
    inStock: true,
    description: "Standard Nigerian certified copper single-core and conduit cables.",
  },
  {
    id: "item-general-goods",
    name: "General Goods",
    category: "general",
    iconName: "Package",
    retailPrice: 1500,
    wholesalePrice: 1100,
    priceMode: "both",
    unit: "item",
    wholesaleMinQty: 10,
    inStock: true,
    description: "Sockets, breakers, junction boxes, trunking and conduit accessories.",
  },
];

const STORAGE_KEY = "stark_store_items_v2";
const PIN_KEY = "stark_store_admin_pin_v2";
const EVENT_NAME = "stark:store-updated";
export const DEFAULT_ADMIN_PIN = "stark2026";

export function formatNaira(amount: number | null | undefined): string {
  if (amount == null || isNaN(amount)) return "Contact for price";
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function loadCatalogFromStorage(): StoreItem[] {
  if (typeof window === "undefined") return DEFAULT_STORE_ITEMS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORE_ITEMS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load store catalog from localStorage", e);
  }
  return DEFAULT_STORE_ITEMS;
}

export function saveCatalogToStorage(items: StoreItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (e) {
    console.error("Failed to save store catalog to localStorage", e);
  }
}

export function getAdminPin(): string {
  if (typeof window === "undefined") return DEFAULT_ADMIN_PIN;
  return window.localStorage.getItem(PIN_KEY) || DEFAULT_ADMIN_PIN;
}

export function setAdminPin(pin: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PIN_KEY, pin);
}

export function buildItemWhatsAppLink(params: {
  item: StoreItem;
  quantity: number;
  rateType: "retail" | "wholesale";
}): string {
  const { item, quantity, rateType } = params;
  const unitPrice = rateType === "wholesale" ? item.wholesalePrice : item.retailPrice;
  const rateLabel = rateType === "wholesale" ? "Wholesale" : "Retail";
  const unitLabel = quantity > 1 ? `${item.unit}s` : item.unit;

  if (unitPrice != null && !isNaN(unitPrice)) {
    const total = unitPrice * quantity;
    const text = `Hello Stark Electrical Work, I want to order ${quantity} ${unitLabel} of ${item.name} (${rateLabel}: ${formatNaira(unitPrice)} each, Total: ${formatNaira(total)}).`;
    return whatsappLink(text);
  }

  const text = `Hello Stark Electrical Work, I want to inquire about ${quantity} ${unitLabel} of ${item.name} at ${rateLabel} rate.`;
  return whatsappLink(text);
}

export function useStoreCatalog() {
  const [items, setItems] = useState<StoreItem[]>(() => loadCatalogFromStorage());

  useEffect(() => {
    const handler = () => {
      setItems(loadCatalogFromStorage());
    };
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const updateAll = (newItems: StoreItem[]) => {
    setItems(newItems);
    saveCatalogToStorage(newItems);
  };

  const addItem = (item: Omit<StoreItem, "id"> & { id?: string }) => {
    const id = item.id || `item-${Date.now()}`;
    const newItems = [{ ...item, id }, ...items];
    updateAll(newItems);
  };

  const updateItem = (id: string, updates: Partial<StoreItem>) => {
    const newItems = items.map((it) => (it.id === id ? { ...it, ...updates } : it));
    updateAll(newItems);
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter((it) => it.id !== id);
    updateAll(newItems);
  };

  const resetToDefaults = () => {
    updateAll(DEFAULT_STORE_ITEMS);
  };

  const exportJson = () => {
    return JSON.stringify(items, null, 2);
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        updateAll(parsed);
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON import", e);
    }
    return false;
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    resetToDefaults,
    exportJson,
    importJson,
  };
}
