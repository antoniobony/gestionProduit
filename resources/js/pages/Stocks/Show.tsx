import React from 'react';
import { Link } from '@inertiajs/react';
import { index, edit } from '@/routes/stocks';
import AppLayout from '@/component/layout/AppLayout';

interface Stock {
    id: number;
    quantite: number;
    seuilAlerte: number;
    product: {
        id: number;
        nom: string;
    };
}

interface Props {
    stock: Stock;
    auth: { user: { name: string; email: string } };
}

export default function Show({ stock, auth }: Props) {
    return (
        <AppLayout user={auth.user}>
            <div style={styles.page}>
                {/* Header */}
                <div style={styles.header}>
                    <p style={styles.breadcrumb}>
                        <Link href={index()} style={styles.breadcrumbLink}>Stocks</Link>
                        <span style={styles.breadcrumbSep}>/</span>
                        Stock #{stock.id}
                    </p>
                    <div style={styles.headerRow}>
                        <h1 style={styles.title}>Fiche stock</h1>
                        <div style={styles.headerActions}>
                            <Link href={index()} style={styles.btnSecondary}>
                                ← Retour
                            </Link>
                            <Link href={edit(stock.id)} style={styles.btnPrimary}>
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
                            📦
                        </div>
                        <div>
                            <p style={styles.clientName}>Stock #{stock.id}</p>
                            <p style={styles.clientId}>Produit : {stock.product.nom}</p>
                        </div>
                    </div>

                    <div style={styles.divider} />

                    {/* Infos */}
                    <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>📦</div>
                            <div>
                                <p style={styles.infoLabel}>Produit</p>
                                <p style={styles.infoValue}>{stock.product.nom}</p>
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>🔢</div>
                            <div>
                                <p style={styles.infoLabel}>Quantité en stock</p>
                                <p style={styles.infoValue}>{stock.quantite} unités</p>
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>⚠️</div>
                            <div>
                                <p style={styles.infoLabel}>Seuil d'alerte</p>
                                <p style={styles.infoValue}>{stock.seuilAlerte} unités</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    // Copiez ici exactement les mêmes styles que dans le Product Show ci-dessus
    page: { /* ... */ },
    header: { /* ... */ },
    breadcrumb: { /* ... */ },
    breadcrumbLink: { /* ... */ },
    breadcrumbSep: { /* ... */ },
    headerRow: { /* ... */ },
    title: { /* ... */ },
    headerActions: { /* ... */ },
    btnSecondary: { /* ... */ },
    btnPrimary: { /* ... */ },
    card: { /* ... */ },
    cardTop: { /* ... */ },
    avatar: { /* ... */ },
    clientName: { /* ... */ },
    clientId: { /* ... */ },
    divider: { /* ... */ },
    infoGrid: { /* ... */ },
    infoItem: { /* ... */ },
    infoIcon: { /* ... */ },
    infoLabel: { /* ... */ },
    infoValue: { /* ... */ },
};