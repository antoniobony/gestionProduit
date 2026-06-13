import React from 'react';
import { Link } from '@inertiajs/react';
import { index, edit } from '@/routes/products';
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

function getInitials(name: string) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export default function Show({ product, auth }: Props) {
    return (
        <AppLayout user={auth.user}>
            <div style={styles.page}>
                {/* Header */}
                <div style={styles.header}>
                    <p style={styles.breadcrumb}>
                        <Link href={index()} style={styles.breadcrumbLink}>Produits</Link>
                        <span style={styles.breadcrumbSep}>/</span>
                        {product.nom}
                    </p>
                    <div style={styles.headerRow}>
                        <h1 style={styles.title}>Fiche produit</h1>
                        <div style={styles.headerActions}>
                            <Link href={index()} style={styles.btnSecondary}>
                                ← Retour
                            </Link>
                            <Link href={edit(product.id)} style={styles.btnPrimary}>
                                Modifier
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div style={styles.card}>
                    {/* Avatar + nom */}
                    <div style={styles.cardTop}>
                        <div style={styles.avatar}>
                            {getInitials(product.nom)}
                        </div>
                        <div>
                            <p style={styles.clientName}>{product.nom}</p>
                            <p style={styles.clientId}>Produit #{product.id}</p>
                        </div>
                    </div>

                    <div style={styles.divider} />

                    {/* Infos */}
                    <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>🏷️</div>
                            <div>
                                <p style={styles.infoLabel}>Catégorie</p>
                                <p style={styles.infoValue}>{product.category}</p>
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>💰</div>
                            <div>
                                <p style={styles.infoLabel}>Prix</p>
                                <p style={styles.infoValue}>{product.price} Ar</p>
                            </div>
                        </div>

                        {product.image && (
                            <div style={{ ...styles.infoItem, gridColumn: '1 / -1' }}>
                                <div style={styles.infoIcon}>🖼️</div>
                                <div>
                                    <p style={styles.infoLabel}>Image</p>
                                    <img 
                                        src={product.image} 
                                        alt={product.nom} 
                                        style={styles.productImage} 
                                    />
                                </div>
                            </div>
                        )}

                        <div style={{ ...styles.infoItem, gridColumn: '1 / -1' }}>
                            <div style={styles.infoIcon}>📝</div>
                            <div>
                                <p style={styles.infoLabel}>Description</p>
                                <p style={styles.infoValue}>{product.description || 'Aucune description'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: '680px',
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
    breadcrumbSep: {
        color: '#d1d5db',
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#111827',
        margin: 0,
    },
    headerActions: {
        display: 'flex',
        gap: '10px',
    },
    btnSecondary: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '9px 16px',
        backgroundColor: 'transparent',
        color: '#6b7280',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        textDecoration: 'none',
    },
    btnPrimary: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '9px 18px',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        textDecoration: 'none',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        padding: '28px',
    },
    cardTop: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px',
    },
    avatar: {
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        backgroundColor: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 700,
        color: '#1d4ed8',
        flexShrink: 0,
    },
    clientName: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#111827',
        margin: 0,
    },
    clientId: {
        fontSize: '13px',
        color: '#9ca3af',
        margin: '3px 0 0 0',
    },
    divider: {
        height: '1px',
        backgroundColor: '#f3f4f6',
        marginBottom: '24px',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
    },
    infoIcon: {
        width: '34px',
        height: '34px',
        borderRadius: '8px',
        backgroundColor: '#eff6ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        flexShrink: 0,
        marginTop: '2px',
    },
    infoLabel: {
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        color: '#9ca3af',
        margin: '0 0 3px 0',
    },
    infoValue: {
        fontSize: '14px',
        color: '#111827',
        margin: 0,
        fontWeight: 500,
        lineHeight: '1.5',
    },
    productImage: {
        maxWidth: '100%',
        maxHeight: '280px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        objectFit: 'contain',
    },
};