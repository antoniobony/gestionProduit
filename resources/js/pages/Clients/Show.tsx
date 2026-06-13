import React from 'react';
import { Link } from '@inertiajs/react';
import { edit, index } from '@/routes/clients';
import AppLayout from '@/component/layout/AppLayout';

interface Client {
    id: number;
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
}

interface Props {
    client: Client;
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

export default function Show({ client, auth }: Props) {
    return (
        <AppLayout user={auth.user}>
            <div style={styles.page}>
                {/* Header */}
                <div style={styles.header}>
                    <p style={styles.breadcrumb}>
                        <Link href={index()} style={styles.breadcrumbLink}>Clients</Link>
                        <span style={styles.breadcrumbSep}>/</span>
                        {client.nom}
                    </p>
                    <div style={styles.headerRow}>
                        <h1 style={styles.title}>Fiche client</h1>
                        <div style={styles.headerActions}>
                            <Link href={index()} style={styles.btnSecondary}>
                                ← Retour
                            </Link>
                            <Link href={edit(client.id)} style={styles.btnPrimary}>
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
                            {getInitials(client.nom)}
                        </div>
                        <div>
                            <p style={styles.clientName}>{client.nom}</p>
                            <p style={styles.clientId}>Client #{client.id}</p>
                        </div>
                    </div>

                    <div style={styles.divider} />

                    {/* Infos */}
                    <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p style={styles.infoLabel}>Email</p>
                                <a href={`mailto:${client.email}`} style={styles.infoValueLink}>{client.email}</a>
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <p style={styles.infoLabel}>Téléphone</p>
                                <a href={`tel:${client.telephone}`} style={styles.infoValueLink}>{client.telephone}</a>
                            </div>
                        </div>

                        <div style={{ ...styles.infoItem, gridColumn: '1 / -1' }}>
                            <div style={styles.infoIcon}>
                                <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                </svg>
                            </div>
                            <div>
                                <p style={styles.infoLabel}>Adresse</p>
                                <p style={styles.infoValue}>{client.adresse}</p>
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
    },
    infoValueLink: {
        fontSize: '14px',
        color: '#2563eb',
        margin: 0,
        fontWeight: 500,
        textDecoration: 'none',
    },
};
