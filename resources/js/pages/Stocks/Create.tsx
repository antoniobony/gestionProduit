import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { store, index } from '@/routes/stocks';
import AppLayout from '@/component/layout/AppLayout';

interface Product {
    id: number;
    nom: string;
}

interface PageProps {
    auth: { user: { name: string; email: string } };
    products: Product[];
}

export default function Create({ auth, products }: PageProps) {
    const { data, setData, post, errors, processing } = useForm({
        quantite: '',
        seuilAlerte: '',
        product_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <AppLayout user={auth.user}>
            <div style={styles.page}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <p style={styles.breadcrumb}>
                            <Link href={index()} style={styles.breadcrumbLink}>Stocks</Link>
                            <span style={styles.breadcrumbSep}>/</span>
                            Nouveau stock
                        </p>
                        <h1 style={styles.title}>Ajouter un stock</h1>
                    </div>
                </div>

                {/* Form card */}
                <div style={styles.card}>
                    <form onSubmit={submit} noValidate>
                        <div style={styles.grid}>
                            {/* Produit */}
                            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                                <label style={styles.label} htmlFor="product_id">Produit</label>
                                <select
                                    id="product_id"
                                    value={data.product_id}
                                    onChange={(e) => setData('product_id', e.target.value)}
                                    style={{
                                        ...styles.input,
                                        ...(errors.product_id ? styles.inputError : {}),
                                    }}
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

                            {/* Quantité */}
                            <div style={styles.field}>
                                <label style={styles.label} htmlFor="quantite">Quantité</label>
                                <input
                                    id="quantite"
                                    type="number"
                                    value={data.quantite}
                                    onChange={(e) => setData('quantite', e.target.value)}
                                    placeholder="50"
                                    style={{
                                        ...styles.input,
                                        ...(errors.quantite ? styles.inputError : {}),
                                    }}
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
                                    placeholder="10"
                                    style={{
                                        ...styles.input,
                                        ...(errors.seuilAlerte ? styles.inputError : {}),
                                    }}
                                />
                                {errors.seuilAlerte && <p style={styles.errorMsg}>{errors.seuilAlerte}</p>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={styles.actions}>
                            <Link href={index()} style={styles.btnCancel}>
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    ...styles.btnSubmit,
                                    opacity: processing ? 0.6 : 1,
                                    cursor: processing ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {processing ? 'Enregistrement…' : 'Enregistrer le stock'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

// Styles identiques
const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: '720px',
        margin: '0 auto',
        padding: '40px 24px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    header: {
        marginBottom: '28px',
    },
    breadcrumb: {
        fontSize: '13px',
        color: '#9ca3af',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    } as React.CSSProperties,
    breadcrumbLink: {
        color: '#2563eb',
        textDecoration: 'none',
        fontSize: '13px',
    },
    breadcrumbSep: {
        color: '#d1d5db',
    },
    title: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#111827',
        margin: 0,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        padding: '28px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '28px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
        fontWeight: 600,
        color: '#374151',
    },
    input: {
        padding: '10px 12px',
        fontSize: '14px',
        color: '#111827',
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.15s, background-color 0.15s',
        width: '100%',
    },
    inputError: {
        borderColor: '#f87171',
        backgroundColor: '#fff7f7',
    },
    errorMsg: {
        fontSize: '12px',
        color: '#ef4444',
        margin: 0,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        paddingTop: '20px',
        borderTop: '1px solid #f3f4f6',
    },
    btnCancel: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 18px',
        backgroundColor: 'transparent',
        color: '#6b7280',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        textDecoration: 'none',
        cursor: 'pointer',
    },
    btnSubmit: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
    },
};