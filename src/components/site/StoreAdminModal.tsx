import { useState, type FormEvent } from "react";
import {
  Check,
  Copy,
  KeyRound,
  Lock,
  Plus,
  RefreshCcw,
  Trash2,
  Upload,
  SlidersHorizontal,
  Package,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useStoreCatalog,
  getAdminPin,
  setAdminPin,
  ICON_MAP,
  type StoreItem,
  type PriceDisplayMode,
} from "@/lib/store-catalog";

interface StoreAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StoreAdminModal({ open, onOpenChange }: StoreAdminModalProps) {
  const { items, addItem, updateItem, deleteItem, resetToDefaults, exportJson, importJson } =
    useStoreCatalog();

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [activeTab, setActiveTab] = useState<"inventory" | "add" | "settings">("inventory");
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // New item form state
  const [newItem, setNewItem] = useState<{
    name: string;
    category: "lighting" | "cables" | "solar" | "fittings" | "general";
    iconName: string;
    retailPrice: string;
    wholesalePrice: string;
    priceMode: PriceDisplayMode;
    unit: string;
    wholesaleMinQty: string;
    badge: string;
    inStock: boolean;
    description: string;
  }>({
    name: "",
    category: "lighting",
    iconName: "Lightbulb",
    retailPrice: "1500",
    wholesalePrice: "1200",
    priceMode: "both",
    unit: "piece",
    wholesaleMinQty: "10",
    badge: "",
    inStock: true,
    description: "",
  });

  // Change PIN state
  const [newPin, setNewPin] = useState("");
  const [pinChangeMsg, setPinChangeMsg] = useState<string | null>(null);

  const handlePinSubmit = (e: FormEvent) => {
    e.preventDefault();
    const correctPin = getAdminPin();
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
    }
  };

  const handleSavePin = (e: FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      setAdminPin(newPin.trim());
      setPinChangeMsg("PIN updated successfully!");
      setNewPin("");
      setTimeout(() => setPinChangeMsg(null), 3000);
    }
  };

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    addItem({
      name: newItem.name.trim(),
      category: newItem.category,
      iconName: newItem.iconName || "Package",
      retailPrice: newItem.retailPrice ? parseFloat(newItem.retailPrice) : null,
      wholesalePrice: newItem.wholesalePrice ? parseFloat(newItem.wholesalePrice) : null,
      priceMode: newItem.priceMode,
      unit: newItem.unit.trim() || "piece",
      wholesaleMinQty: parseInt(newItem.wholesaleMinQty, 10) || 1,
      badge: newItem.badge.trim() || undefined,
      inStock: newItem.inStock,
      description: newItem.description.trim() || undefined,
    });

    setNewItem({
      name: "",
      category: "lighting",
      iconName: "Lightbulb",
      retailPrice: "1500",
      wholesalePrice: "1200",
      priceMode: "both",
      unit: "piece",
      wholesaleMinQty: "10",
      badge: "",
      inStock: true,
      description: "",
    });

    setActiveTab("inventory");
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(exportJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const ok = importJson(importText.trim());
    if (ok) {
      setImportStatus("Catalog imported successfully!");
      setImportText("");
      setTimeout(() => {
        setImportStatus(null);
        setActiveTab("inventory");
      }, 1500);
    } else {
      setImportStatus("Error: Invalid JSON format. Check structure.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-border bg-card p-6 text-card-foreground shadow-2xl sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <SlidersHorizontal className="h-5 w-5" />
              </span>
              <div>
                <DialogTitle className="text-xl font-bold">Store &amp; Price Admin</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Update inventory items, retail/wholesale prices, and display modes.
                </DialogDescription>
              </div>
            </div>

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <Lock className="mr-1 h-3.5 w-3.5" /> Lock Admin
              </Button>
            )}
          </div>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="my-8 flex flex-col items-center justify-center text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted text-primary">
              <KeyRound className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold">Enter Admin PIN</h3>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              This area is restricted to Stark Electrical Work administrators. (Default PIN:{" "}
              <code className="font-mono font-bold text-accent">stark2026</code>)
            </p>

            <form onSubmit={handlePinSubmit} className="mt-6 flex w-full max-w-xs flex-col gap-3">
              <Input
                type="password"
                placeholder="Enter 4+ digit PIN"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`text-center font-mono text-lg tracking-widest ${
                  pinError ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-xs font-semibold text-destructive">
                  Incorrect PIN. Please try again.
                </p>
              )}
              <Button type="submit" variant="power" size="default" className="w-full">
                Unlock Admin Portal
              </Button>
            </form>
          </div>
        ) : (
          <div className="mt-2 space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-border text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("inventory")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 transition-colors ${
                  activeTab === "inventory"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Package className="h-4 w-4" /> All Items ({items.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("add")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 transition-colors ${
                  activeTab === "add"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Plus className="h-4 w-4" /> Add Material
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 transition-colors ${
                  activeTab === "settings"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" /> Backup &amp; PIN
              </button>
            </div>

            {/* Tab 1: Inventory Table */}
            {activeTab === "inventory" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Changes update live in the Store section instantly.</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("add")}
                    className="h-8 gap-1 text-xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Material
                  </Button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 shadow-sm md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-primary">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">{item.name}</span>
                            {item.badge && (
                              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[0.65rem] font-semibold text-accent">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Unit: {item.unit} · Wholesale Min: {item.wholesaleMinQty}
                          </span>
                        </div>
                      </div>

                      {/* Display Mode selector */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                            Display Mode
                          </span>
                          <div className="inline-flex rounded-lg border border-input p-0.5 text-xs">
                            {(["both", "retail", "wholesale"] as const).map((m) => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => updateItem(item.id, { priceMode: m })}
                                className={`rounded px-2 py-1 capitalize transition-all ${
                                  item.priceMode === m
                                    ? "bg-primary font-bold text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Retail Price input */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                            Retail (₦)
                          </span>
                          <Input
                            type="number"
                            value={item.retailPrice ?? ""}
                            onChange={(e) =>
                              updateItem(item.id, {
                                retailPrice: e.target.value ? parseFloat(e.target.value) : null,
                              })
                            }
                            className="h-8 w-24 text-xs font-semibold"
                            placeholder="₦"
                          />
                        </div>

                        {/* Wholesale Price input */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                            Wholesale (₦)
                          </span>
                          <Input
                            type="number"
                            value={item.wholesalePrice ?? ""}
                            onChange={(e) =>
                              updateItem(item.id, {
                                wholesalePrice: e.target.value ? parseFloat(e.target.value) : null,
                              })
                            }
                            className="h-8 w-24 text-xs font-semibold"
                            placeholder="₦"
                          />
                        </div>

                        {/* In Stock toggle */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                            Stock
                          </span>
                          <button
                            type="button"
                            onClick={() => updateItem(item.id, { inStock: !item.inStock })}
                            className={`h-8 rounded-lg px-2 text-xs font-semibold transition-colors ${
                              item.inStock
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </button>
                        </div>

                        {/* Delete button */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                            Remove
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (window.confirm(`Delete ${item.name} from catalog?`)) {
                                deleteItem(item.id);
                              }
                            }}
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Delete ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Add New Material */}
            {activeTab === "add" && (
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="item-name">Material / Product Name *</Label>
                    <Input
                      id="item-name"
                      required
                      placeholder="e.g. Solar Inverter 3.5kVA"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="item-category">Category</Label>
                    <select
                      id="item-category"
                      value={newItem.category}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          category: e.target.value as StoreItem["category"],
                        })
                      }
                      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="lighting">Lighting &amp; Bulbs</option>
                      <option value="cables">Cables &amp; Wiring</option>
                      <option value="solar">Solar &amp; Inverters</option>
                      <option value="fittings">Fittings &amp; Breakers</option>
                      <option value="general">General Goods</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="retail-price">Retail Price (₦)</Label>
                    <Input
                      id="retail-price"
                      type="number"
                      placeholder="e.g. 2500"
                      value={newItem.retailPrice}
                      onChange={(e) => setNewItem({ ...newItem, retailPrice: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="wholesale-price">Wholesale Price (₦)</Label>
                    <Input
                      id="wholesale-price"
                      type="number"
                      placeholder="e.g. 2000"
                      value={newItem.wholesalePrice}
                      onChange={(e) => setNewItem({ ...newItem, wholesalePrice: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="wholesale-min">Wholesale Min Qty</Label>
                    <Input
                      id="wholesale-min"
                      type="number"
                      placeholder="e.g. 10"
                      value={newItem.wholesaleMinQty}
                      onChange={(e) => setNewItem({ ...newItem, wholesaleMinQty: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="item-mode">Pricing Display Mode</Label>
                    <select
                      id="item-mode"
                      value={newItem.priceMode}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          priceMode: e.target.value as PriceDisplayMode,
                        })
                      }
                      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="both">Both (Retail &amp; Wholesale)</option>
                      <option value="retail">Retail Only</option>
                      <option value="wholesale">Wholesale Only</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="item-unit">Unit (e.g. piece, coil, roll)</Label>
                    <Input
                      id="item-unit"
                      placeholder="piece"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="item-badge">Badge (Optional)</Label>
                    <Input
                      id="item-badge"
                      placeholder="e.g. Bestseller, New"
                      value={newItem.badge}
                      onChange={(e) => setNewItem({ ...newItem, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="item-icon">Icon</Label>
                  <select
                    id="item-icon"
                    value={newItem.iconName}
                    onChange={(e) => setNewItem({ ...newItem, iconName: e.target.value })}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {Object.keys(ICON_MAP).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="item-desc">Short Description (Optional)</Label>
                  <Input
                    id="item-desc"
                    placeholder="Brief details about warranty, grade, or rating"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("inventory")}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="power">
                    <Plus className="mr-1 h-4 w-4" /> Add Material to Store
                  </Button>
                </div>
              </form>
            )}

            {/* Tab 3: Backup & Settings */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-background p-4">
                  <h4 className="font-bold text-foreground">Export / Backup Catalog</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Copy the entire inventory catalog as JSON to keep a backup or send to the
                    developer to commit permanently.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyJson}
                      className="gap-1.5"
                    >
                      {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied JSON to Clipboard!" : "Copy Catalog JSON"}
                    </Button>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <h4 className="font-bold text-foreground">Import Catalog JSON</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Paste previously exported JSON to bulk-update or restore all items.
                  </p>
                  <form onSubmit={handleImportSubmit} className="mt-3 space-y-2">
                    <textarea
                      rows={4}
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      placeholder='[{"id":"item-1","name":"Bulbs",...}]'
                      className="w-full rounded-md border border-input bg-card p-2 font-mono text-xs text-foreground"
                    />
                    {importStatus && (
                      <p
                        className={`text-xs font-semibold ${
                          importStatus.startsWith("Error") ? "text-destructive" : "text-primary"
                        }`}
                      >
                        {importStatus}
                      </p>
                    )}
                    <Button type="submit" variant="power" size="sm" className="gap-1.5">
                      <Upload className="h-4 w-4" /> Import and Apply
                    </Button>
                  </form>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <h4 className="font-bold text-foreground">Change Admin PIN</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Update the passcode required to access this admin panel.
                  </p>
                  <form onSubmit={handleSavePin} className="mt-3 flex max-w-sm gap-2">
                    <Input
                      type="password"
                      placeholder="New PIN (4+ characters)"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="font-mono text-xs"
                    />
                    <Button type="submit" variant="outline" size="sm">
                      Update PIN
                    </Button>
                  </form>
                  {pinChangeMsg && (
                    <p className="mt-2 text-xs font-bold text-primary">{pinChangeMsg}</p>
                  )}
                </div>

                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                  <h4 className="font-bold text-destructive">Reset Catalog to Factory Defaults</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This will discard all local inventory edits and restore the 7 initial Stark
                    materials.
                  </p>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset all store items to factory defaults?")) {
                        resetToDefaults();
                        setActiveTab("inventory");
                      }
                    }}
                    className="mt-3 gap-1.5"
                  >
                    <RefreshCcw className="h-3.5 w-3.5" /> Reset to Factory Defaults
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
