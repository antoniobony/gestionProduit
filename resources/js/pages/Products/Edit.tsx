import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { update, index, show } from '@/routes/products';
import AppLayout from '@/component/layout/AppLayout';

interface Product {
    id: number;
    nom: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
}

interface Props {
    product: Product;
    auth: { user: { name: string; email: string } };
}

export default function Edit({ product, auth }: Props) {
    const { data, setData, put, errors, processing, isDirty } = useForm({
        nom: product.nom || '',
        description: product.description || '',
        price: product.price || '',
        image: product.image || '',
        category: product.category || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(product.id));
    };

    return (
        <AppLayout user={auth.user}>
            <div style={styles.page}>
                {/* Header */}
                <div style={styles.header}>
                    <p style={styles.breadcrumb}>
                        <Link href={index()} style={styles.breadcrumbLink}>Produits</Link>
                        <span style={styles.breadcrumbSep}>/</span>
                        <Link href={show(product.id)} style={styles.breadcrumbLink}>{product.nom}</Link>
                        <span style={styles.breadcrumbSep}>/</span>
                        Modifier
                    </p>
                    <h1 style={styles.title}>Modifier le produit</h1>
                </div>

                {/* Form card */}
                <div style={styles.card}>
                    {/* Identity banner */}
                    <div style={styles.banner}>
                        <div style={styles.avatar}>
                            {product.nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <div>
                            <p style={styles.bannerName}>{product.nom}</p>
                            <p style={styles.bannerId}>Produit #{product.id}</p>
                        </div>
                    </div>

                    <div style={styles.divider} />

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
                                    style={{ ...styles.input, ...(errors.nom ? styles.inputError : {}) }}
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
                                    style={{ ...styles.input, ...(errors.category ? styles.inputError : {}) }}
                                />
                                {errors.category && <p style={styles.errorMsg}>{errors.category}</p>}
                            </div>

                            {/* Prix */}
                            <div style={styles.field}>
                                <label style={styles.label} htmlFor="price">Prix</label>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    style={{ ...styles.input, ...(errors.price ? styles.inputError : {}) }}
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
                                    style={{ ...styles.input, ...(errors.image ? styles.inputError : {}) }}
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
                                    rows={5}
                                    style={{ 
                                        ...styles.input, 
                                        resize: 'vertical',
                                        minHeight: '120px',
                                        ...(errors.description ? styles.inputError : {}) 
                                    }}
                                />
                                {errors.description && <p style={styles.errorMsg}>{errors.description}</p>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={styles.actions}>
                            {isDirty && (
                                <p style={styles.unsavedHint}>● Modifications non enregistrées</p>
                            )}
                            <div style={styles.actionBtns}>
                                <Link href={show(product.id)} style={styles.btnCancel}>
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

// Styles identiques au composant Client
const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: '720px',
        margin: '0 auto',
        padding: '40px 24px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    header: { marginBottom: '28px' },
    breadcrumb: {
        fontSize: '13px',
        color: '#9ca3af',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    } as React.CSSProperties,
    breadcrumbLink: {
        color: '#2563eb',
        textDecoration: 'none',
        fontSize: '13px',
    },
    breadcrumbSep: { color: '#d1d5db' },
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
    banner: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '24px',
    },
    avatar: {
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '15px',
        fontWeight: 700,
        color: '#1d4ed8',
        flexShrink: 0,
    },
    bannerName: {
        fontSize: '15px',
        fontWeight: 600,
        color: '#111827',
        margin: 0,
    },
    bannerId: {
        fontSize: '12px',
        color: '#9ca3af',
        margin: '2px 0 0 0',
    },
    divider: {
        height: '1px',
        backgroundColor: '#f3f4f6',
        marginBottom: '24px',
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '20px',
        borderTop: '1px solid #f3f4f6',
        gap: '12px',
    },
    unsavedHint: {
        fontSize: '12px',
        color: '#f59e0b',
        margin: 0,
        fontWeight: 500,
    },
    actionBtns: {
        display: 'flex',
        gap: '10px',
        marginLeft: 'auto',
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