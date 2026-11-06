import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatNaira,
  getStoreIcon,
  buildItemWhatsAppLink,
  type StoreItem,
} from "@/lib/store-catalog";

interface StoreItemCardProps {
  item: StoreItem;
}

export function StoreItemCard({ item }: StoreItemCardProps) {
  const Icon = getStoreIcon(item.iconName);

  const initialRate = item.priceMode === "wholesale" ? "wholesale" : "retail";
  const [rateType, setRateType] = useState<"retail" | "wholesale">(initialRate);

  const minQty = rateType === "wholesale" ? Math.max(1, item.wholesaleMinQty || 1) : 1;
  const [quantity, setQuantity] = useState<number>(() => minQty);

  const handleRateChange = (newRate: "retail" | "wholesale") => {
    setRateType(newRate);
    if (newRate === "wholesale") {
      const requiredMin = Math.max(1, item.wholesaleMinQty || 1);
      if (quantity < requiredMin) {
        setQuantity(requiredMin);
      }
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(minQty, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const activeUnitPrice = rateType === "wholesale" ? item.wholesalePrice : item.retailPrice;
  const totalAmount = activeUnitPrice != null ? activeUnitPrice * quantity : null;

  const orderLink = buildItemWhatsAppLink({
    item,
    quantity,
    rateType,
  });

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow">
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {item.badge && (
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                {item.badge}
              </span>
            )}
            {!item.inStock && (
              <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-display text-lg font-bold tracking-tight text-foreground">{item.name}</h3>
          {item.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>

        {/* Pricing Mode Selector / Badges */}
        <div className="mt-4">
          {item.priceMode === "both" ? (
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted/80 p-1 text-xs">
              <button
                type="button"
                onClick={() => handleRateChange("retail")}
                className={`rounded-lg py-1.5 font-semibold transition-all ${
                  rateType === "retail"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Retail: {formatNaira(item.retailPrice)}
              </button>
              <button
                type="button"
                onClick={() => handleRateChange("wholesale")}
                className={`rounded-lg py-1.5 font-semibold transition-all ${
                  rateType === "wholesale"
                    ? "bg-card text-accent shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={`Minimum wholesale quantity: ${item.wholesaleMinQty} ${item.unit}s`}
              >
                Wholesale: {formatNaira(item.wholesalePrice)}
              </button>
            </div>
          ) : item.priceMode === "retail" ? (
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-left">
              <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                Retail Price
              </span>
              <span className="font-display text-lg font-extrabold text-foreground">
                {formatNaira(item.retailPrice)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">/ {item.unit}</span>
              </span>
            </div>
          ) : (
            <div className="rounded-xl border border-accent/20 bg-accent/5 px-3 py-2 text-left">
              <div className="flex items-center justify-between">
                <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-accent">
                  Wholesale Only
                </span>
                <span className="text-[0.65rem] font-medium text-muted-foreground">
                  Min: {item.wholesaleMinQty} {item.unit}s
                </span>
              </div>
              <span className="font-display text-lg font-extrabold text-foreground">
                {formatNaira(item.wholesalePrice)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">/ {item.unit}</span>
              </span>
            </div>
          )}

          {rateType === "wholesale" && item.priceMode === "both" && (
            <p className="mt-1.5 text-right text-[0.65rem] font-medium text-accent">
              * Wholesale rate applies to orders of {item.wholesaleMinQty}+ {item.unit}s
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-border/60 pt-4">
        {/* Quantity Controller & Live Total */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center rounded-xl border border-input bg-background p-1 shadow-sm">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= minQty}
              aria-label="Decrease quantity"
              className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-8 text-center text-xs font-bold text-foreground">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="Increase quantity"
              className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="text-right">
            <span className="block text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              Estimated Total
            </span>
            <span className="font-display text-sm font-bold text-foreground">
              {formatNaira(totalAmount)}
            </span>
          </div>
        </div>

        {/* WhatsApp Order Button */}
        <Button
          asChild
          variant="power"
          size="default"
          className="mt-3 w-full justify-center text-xs font-bold"
        >
          <a href={orderLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-3.5 w-3.5" />
            Order {quantity} {quantity > 1 ? `${item.unit}s` : item.unit} on WhatsApp
          </a>
        </Button>
      </div>
    </article>
  );
}
