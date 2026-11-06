import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Copy,
  KeyRound,
  Lock,
  Package,
  Plus,
  RefreshCcw,
  SlidersHorizontal,
  Trash2,
  Upload,
} from "lucide-react";
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
import logoMark from "@/assets/stark-logo-mark.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Store Admin — Stark Electrical Work" },
      { name: "description", content: "Manage material prices, inventory, and WhatsApp order settings." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-ink-line bg-ink text-ink-foreground">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoMark} alt="Stark" width={32} height={32} className="h-8 w-8" />
              <span className="font-brand text-sm tracking-wider">STARK ADMIN</span>
            </Link>
            <span className="hidden rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary sm:inline-block">
              Store &amp; Inventory
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-xs text-ink-muted hover:text-ink-foreground">
              <Link to="/">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Website
              </Link>
            </Button>
            {isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="h-8 border-ink-line bg-ink-soft/60 text-xs text-ink-muted hover:bg-ink-soft hover:text-ink-foreground"
              >
                <Lock className="mr-1.5 h-3.5 w-3.5" /> Lock
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {!isAuthenticated ? (
          <div className="mx-auto my-12 max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-lift">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-muted text-primary">
              <KeyRound className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">Admin Portal</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your admin PIN to manage material prices, stock, and display modes.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              (Default PIN: <code className="font-mono font-bold text-accent">stark2026</code>)
            </p>

            <form onSubmit={handlePinSubmit} className="mt-6 space-y-4">
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`text-center font-mono text-xl tracking-widest ${
                  pinError ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-xs font-semibold text-destructive">
                  Incorrect PIN. Please try again.
                </p>
              )}
              <Button type="submit" variant="power" size="xl" className="w-full">
                Unlock Dashboard
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header info */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="font-display text-3xl font-extrabold tracking-tight">Material &amp; Price Catalog</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Update retail/wholesale rates, stock availability, and display modes live on the website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={activeTab === "inventory" ? "power" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("inventory")}
                >
                  <Package className="mr-1.5 h-4 w-4" /> All Items ({items.length})
                </Button>
                <Button
                  variant={activeTab === "add" ? "power" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("add")}
                >
                  <Plus className="mr-1.5 h-4 w-4" /> Add Item
                </Button>
                <Button
                  variant={activeTab === "settings" ? "power" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("settings")}
                >
                  <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Backup &amp; PIN
                </Button>
              </div>
            </div>

            {/* TAB 1: Inventory List */}
            {activeTab === "inventory" && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary/40 lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted text-primary">
                          <Package className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-base font-bold text-foreground">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Unit: <strong className="text-foreground">{item.unit}</strong> · Wholesale Min Qty:{" "}
                            <strong className="text-foreground">{item.wholesaleMinQty}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        {/* Display Mode */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                            Display Mode
                          </span>
                          <div className="inline-flex rounded-lg border border-input bg-background p-0.5 text-xs">
                            {(["both", "retail", "wholesale"] as const).map((m) => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => updateItem(item.id, { priceMode: m })}
                                className={`rounded px-2.5 py-1 capitalize transition-all ${
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

                        {/* Retail Price */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
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
                            className="h-9 w-28 text-xs font-semibold"
                            placeholder="₦"
                          />
                        </div>

                        {/* Wholesale Price */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
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
                            className="h-9 w-28 text-xs font-semibold"
                            placeholder="₦"
                          />
                        </div>

                        {/* Stock status toggle */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                            Stock Status
                          </span>
                          <button
                            type="button"
                            onClick={() => updateItem(item.id, { inStock: !item.inStock })}
                            className={`h-9 rounded-lg px-3 text-xs font-semibold transition-colors ${
                              item.inStock
                                ? "bg-primary/15 text-primary"
                                : "bg-destructive/15 text-destructive"
                            }`}
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </button>
                        </div>

                        {/* Delete button */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                            Action
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (window.confirm(`Delete ${item.name} from catalog?`)) {
                                deleteItem(item.id);
                              }
                            }}
                            className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
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

            {/* TAB 2: Add Material */}
            {activeTab === "add" && (
              <div className="max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
                <h2 className="text-xl font-bold">Add New Material</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  New items will appear in the Store section with instant WhatsApp ordering.
                </p>

                <form onSubmit={handleAddItem} className="mt-6 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="new-name">Product Name *</Label>
                      <Input
                        id="new-name"
                        required
                        placeholder="e.g. Solar Inverter 3.5kVA"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="new-category">Category</Label>
                      <select
                        id="new-category"
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
                      <Label htmlFor="new-retail">Retail Price (₦)</Label>
                      <Input
                        id="new-retail"
                        type="number"
                        placeholder="e.g. 2500"
                        value={newItem.retailPrice}
                        onChange={(e) => setNewItem({ ...newItem, retailPrice: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="new-wholesale">Wholesale Price (₦)</Label>
                      <Input
                        id="new-wholesale"
                        type="number"
                        placeholder="e.g. 2000"
                        value={newItem.wholesalePrice}
                        onChange={(e) => setNewItem({ ...newItem, wholesalePrice: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="new-wholesale-min">Wholesale Min Qty</Label>
                      <Input
                        id="new-wholesale-min"
                        type="number"
                        placeholder="e.g. 10"
                        value={newItem.wholesaleMinQty}
                        onChange={(e) => setNewItem({ ...newItem, wholesaleMinQty: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="new-mode">Display Mode</Label>
                      <select
                        id="new-mode"
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
                      <Label htmlFor="new-unit">Unit (e.g. piece, coil, roll)</Label>
                      <Input
                        id="new-unit"
                        placeholder="piece"
                        value={newItem.unit}
                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="new-badge">Badge (Optional)</Label>
                      <Input
                        id="new-badge"
                        placeholder="e.g. Popular, New"
                        value={newItem.badge}
                        onChange={(e) => setNewItem({ ...newItem, badge: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="new-icon">Icon</Label>
                    <select
                      id="new-icon"
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
                    <Label htmlFor="new-desc">Description</Label>
                    <Input
                      id="new-desc"
                      placeholder="Brief details about grade, warranty, or rating"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("inventory")}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="power">
                      <Plus className="mr-1.5 h-4 w-4" /> Add Material to Store
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: Backup & Settings */}
            {activeTab === "settings" && (
              <div className="grid max-w-4xl gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-bold">Export / Backup Catalog</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Copy the entire inventory catalog as JSON to keep a backup or send to the developer.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyJson}
                    className="mt-4 gap-1.5"
                  >
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied JSON to Clipboard!" : "Copy Catalog JSON"}
                  </Button>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-bold">Change Admin PIN</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Update the passcode required to access the admin portal.
                  </p>
                  <form onSubmit={handleSavePin} className="mt-4 flex gap-2">
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

                <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:col-span-2">
                  <h3 className="font-bold">Import Catalog JSON</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Paste previously exported JSON to restore or bulk-update all items.
                  </p>
                  <form onSubmit={handleImportSubmit} className="mt-4 space-y-3">
                    <textarea
                      rows={4}
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      placeholder='[{"id":"item-1","name":"Bulbs",...}]'
                      className="w-full rounded-xl border border-input bg-background p-3 font-mono text-xs text-foreground"
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

                <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6 md:col-span-2">
                  <h3 className="font-bold text-destructive">Reset to Factory Defaults</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This will discard all local inventory changes and restore the 7 initial Stark materials.
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
                    className="mt-4 gap-1.5"
                  >
                    <RefreshCcw className="h-3.5 w-3.5" /> Reset to Factory Defaults
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
