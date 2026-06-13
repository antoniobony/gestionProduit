import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { store, index } from '@/routes/products';
import AppLayout from '@/component/layout/AppLayout';

interface PageProps {
    auth: { user: { name: string; email: string } };
}

export default function Create({ auth }: PageProps) {
    const { data, setData, post, errors, processing } = useForm({
        nom: '',
        description: '',
        price: '',
        image: '',
        category: '',
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
                            <Link href={index()} style={styles.breadcrumbLink}>Produits</Link>
                            <span style={styles.breadcrumbSep}>/</span>
                            Nouveau produit
                        </p>
                        <h1 style={styles.title}>Ajouter un produit</h1>
                    </div>
                </div>

                {/* Form card */}
                <div style={styles.card}>
                    <form onSubmit={submit} noValidate>
                        <div style={styles.grid}>
                            {/* Nom */}
                            <div style={styles.field}>
                                <label style={styles.label} htmlFor="nom">Nom</label>
                                <input
                                    id="nom"
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    placeholder="Produit exemple"
                                    style={{
                                        ...styles.input,
                                        ...(errors.nom ? styles.inputError : {}),
                                    }}
                                />
                                {errors.nom && <p style={styles.errorMsg}>{errors.nom}</p>}
                            </div>

                            {/* Catégorie */}
                            <div style={styles.field}>
                                <label style={styles.label} htmlFor="category">Catégorie</label>
                                <input
                                    id="category"
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="Électronique, Vêtements..."
                                    style={{
                                        ...styles.input,
                                        ...(errors.category ? styles.inputError : {}),
                                    }}
                                />
                                {errors.category && <p style={styles.errorMsg}>{errors.category}</p>}
                            </div>

                            {/* Prix */}
                            <div style={styles.field}>
                                <label style={styles.label} htmlFor="price">Prix (Ar)</label>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="12500"
                                    style={{
                                        ...styles.input,
                                        ...(errors.price ? styles.inputError : {}),
                                    }}
                                />
                                {errors.price && <p style={styles.errorMsg}>{errors.price}</p>}
                            </div>

                            {/* Image URL */}
                            <div style={styles.field}>
                                <label style={styles.label} htmlFor="image">Image URL</label>
                                <input
                                    id="image"
                                    type="text"
                                    value={data.image}
                                    onChange={(e) => setData('image', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    style={{
                                        ...styles.input,
                                        ...(errors.image ? styles.inputError : {}),
                                    }}
                                />
                                {errors.image && <p style={styles.errorMsg}>{errors.image}</p>}
                            </div>

                            {/* Description - pleine largeur */}
                            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                                <label style={styles.label} htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description détaillée du produit..."
                                    style={{
                                        ...styles.input,
                                        minHeight: '120px',
                                        resize: 'vertical',
                                        ...(errors.description ? styles.inputError : {}),
                                    }}
                                />
                                {errors.description && <p style={styles.errorMsg}>{errors.description}</p>}
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
                                {processing ? 'Enregistrement…' : 'Enregistrer le produit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

// Styles identiques au composant Client
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