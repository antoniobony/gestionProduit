import React from 'react';
import { Link } from '@inertiajs/react';
import { create, destroy, edit, show } from '@/routes/clients';
import AppLayout from '@/component/layout/AppLayout';

interface Client {
    id: number;
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
}

interface PageProps {
    clients: Client[];
    auth: { user: { name: string; email: string } };
}

const user = {
    name: "antonio",
    email: "string@gmailcom"
}

export default function Index({ clients,auth }: PageProps) {
    return (
        <AppLayout user={auth.user}>
        <div style={styles.page}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Clients</h1>
                    <p style={styles.subtitle}>{clients.length} client{clients.length !== 1 ? 's' : ''} enregistré{clients.length !== 1 ? 's' : ''}</p>
                </div>
                <Link href={create()} style={styles.btnPrimary}>
                    + Ajouter un client
                </Link>
            </div>

            {/* Table card */}
            <div style={styles.card}>
                {clients.length === 0 ? (
                    <div style={styles.empty}>
                        <p style={styles.emptyIcon}>👤</p>
                        <p style={styles.emptyTitle}>Aucun client pour l'instant</p>
                        <p style={styles.emptyText}>Commencez par ajouter votre premier client.</p>
                        <Link href={create()} style={styles.btnPrimary}>+ Ajouter un client</Link>
                    </div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.theadRow}>
                                <th style={{ ...styles.th, width: '60px' }}>#</th>
                                <th style={styles.th}>Nom</th>
                                <th style={styles.th}>Email</th>
                                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client, index) => (
                                <tr
                                    key={client.id}
                                    style={{
                                        ...styles.tr,
                                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#eff6ff')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9fafb')}
                                >
                                    <td style={{ ...styles.td, color: '#9ca3af', fontSize: '13px' }}>
                                        {client.id}
                                    </td>
                                    <td style={{ ...styles.td, fontWeight: 600, color: '#111827' }}>
                                        {client.nom}
                                    </td>
                                    <td style={{ ...styles.td, color: '#6b7280' }}>
                                        {client.email}
                                    </td>
                                    <td style={{ ...styles.td, textAlign: 'right' }}>
                                        <div style={styles.actions}>
                                            <Link href={show(client.id)} style={styles.btnOutline}>
                                                Voir
                                            </Link>
                                            <Link href={edit(client.id)} style={styles.btnWarning}>
                                                Modifier
                                            </Link>
                                            <Link href={destroy(client.id)} style={styles.btnAlert}>
                                                Suprimer
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        </AppLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 24px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: '#111827',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
    },
    title: {
        fontSize: '26px',
        fontWeight: 700,
        margin: 0,
        color: '#111827',
    },
    subtitle: {
        fontSize: '14px',
        color: '#9ca3af',
        margin: '4px 0 0 0',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        overflow: 'hidden',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    theadRow: {
        backgroundColor: '#f3f4f6',
        borderBottom: '1px solid #e5e7eb',
    },
    th: {
        padding: '12px 16px',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        color: '#6b7280',
        textAlign: 'left' as const,
    },
    tr: {
        borderBottom: '1px solid #f3f4f6',
        transition: 'background-color 0.15s',
        cursor: 'default',
    },
    td: {
        padding: '14px 16px',
        fontSize: '14px',
        verticalAlign: 'middle' as const,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
    },
    btnPrimary: {
        display: 'inline-block',
        padding: '10px 18px',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'background-color 0.15s',
        whiteSpace: 'nowrap' as const,
    },
    btnOutline: {
        display: 'inline-block',
        padding: '6px 14px',
        backgroundColor: 'transparent',
        color: '#2563eb',
        border: '1px solid #93c5fd',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        textDecoration: 'none',
    },
    btnWarning: {
        display: 'inline-block',
        padding: '6px 14px',
        backgroundColor: '#fef3c7',
        color: '#92400e',
        border: '1px solid #fcd34d',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        textDecoration: 'none',
    },btnAlert: {
        display: 'inline-block',
        padding: '6px 14px',
        backgroundColor: 'red',
        color: '#fef3c7',
        border: '1px solid #fcd34d',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        textDecoration: 'none',
    },
    empty: {
        textAlign: 'center' as const,
        padding: '60px 24px',
    },
    emptyIcon: {
        fontSize: '40px',
        margin: '0 0 12px',
    },
    emptyTitle: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#374151',
        margin: '0 0 6px',
    },
    emptyText: {
        fontSize: '14px',
        color: '#9ca3af',
        margin: '0 0 20px',
    },
};
