import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { update, index, show } from '@/routes/stocks';
import AppLayout from '@/component/layout/AppLayout';

interface Product {
    id: number;
    nom: string;
}

interface Stock {
    id: number;
    quantite: number;
    seuilAlerte: number;
    product_id: number;
}

interface Props {
    stock: Stock;
    products: Product[];
    auth: { user: { name: string; email: string } };
}

export default function Edit({ stock, products, auth }: Props) {
    const { data, setData, put, errors, processing, isDirty } = useForm({
        quantite: stock.quantite || '',
        seuilAlerte: stock.seuilAlerte || '',
        product_id: stock.product_id || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(stock.id));
    };

    return (
        <AppLayout user={auth.user}>
            <div style={styles.page}>
                {/* Header */}
                <div style={styles.header}>
                    <p style={styles.breadcrumb}>
                        <Link href={index()} style={styles.breadcrumbLink}>Stocks</Link>
                        <span style={styles.breadcrumbSep}>/</span>
                        Modifier
                    </p>
                    <h1 style={styles.title}>Modifier le stock</h1>
                </div>

                {/* Form card */}
                <div style={styles.card}>
                    {/* Identity banner */}
                    <div style={styles.banner}>
                        <div style={styles.avatar}>
                            ST
                        </div>
                        <div>
                            <p style={styles.bannerName}>Stock #{stock.id}</p>
                            <p style={styles.bannerId}>Produit ID : {stock.product_id}</p>
                        </div>
                    </div>

                    <div style={styles.divider} />

                    <form onSubmit={submit} noValidate>
                        <div style={styles.grid}>
                            {/* Quantité */}
                            <div style={styles.field}>
                                <label style={styles.label} htmlFor="quantite">Quantité</label>
                                <input
                                    id="quantite"
                                    type="number"
                                    value={data.quantite}
                                    onChange={(e) => setData('quantite', e.target.value)}
                                    style={{ ...styles.input, ...(errors.quantite ? styles.inputError : {}) }}
                                />
                                {errors.quantite && <p style={styles.errorMsg}>{errors.quantite}</p>}
                            </div>

                            {/* Seuil d'alerte */}
                            <div style={styles.field}>
                                <label style={styles.label} htmlFor="seuilAlerte">Seuil d'alerte</label>
                                <input
                                    id="seuilAlerte"
                                    type="number"
                                    value={data.seuilAlerte}
                                    onChange={(e) => setData('seuilAlerte', e.target.value)}
                                    style={{ ...styles.input, ...(errors.seuilAlerte ? styles.inputError : {}) }}
                                />
                                {errors.seuilAlerte && <p style={styles.errorMsg}>{errors.seuilAlerte}</p>}
                            </div>

                            {/* Produit */}
                            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                                <label style={styles.label} htmlFor="product_id">Produit</label>
                                <select
                                    id="product_id"
                                    value={data.product_id}
                                    onChange={(e) => setData('product_id', e.target.value)}
                                    style={{ ...styles.input, ...(errors.product_id ? styles.inputError : {}) }}
                                >
                                    <option value="">Sélectionner un produit</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.nom}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && <p style={styles.errorMsg}>{errors.product_id}</p>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={styles.actions}>
                            {isDirty && (
                                <p style={styles.unsavedHint}>● Modifications non enregistrées</p>
                            )}
                            <div style={styles.actionBtns}>
                                <Link href={show(stock.id)} style={styles.btnCancel}>
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || !isDirty}
                                    style={{
                                        ...styles.btnSubmit,
                                        opacity: processing || !isDirty ? 0.5 : 1,
                                        cursor: processing || !isDirty ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {processing ? 'Enregistrement…' : 'Enregistrer les modifications'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

// Styles identiques
const styles: Record<string, React.CSSProperties> = { /* Même objet styles que dans le composant Product */ };