import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export interface User {
    name: string;
    email: string;
}

interface AppLayoutProps {
    children: React.ReactNode;
    user: User;
}

const navItems = [
    
    {
        label: 'Tableau de bord',
        href: '/dashboard',
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },{
        label: 'Clients',
        href: '/clients',
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        label: 'Stock',
        href: '/stocks  ',
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
                <line x1="10" y1="14" x2="14" y2="14" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: 'Produits',
        href: '/products',
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
    },
];

function getInitials(name: string) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export default function AppLayout({ children, user }: AppLayoutProps) {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div style={styles.shell}>
            {/* Sidebar */}
            <aside style={{ ...styles.sidebar, width: collapsed ? '68px' : '220px' }}>
                {/* Logo / Toggle */}
                <div style={styles.logoRow}>
                    {!collapsed && (
                        <span style={styles.logoText}>MonApp</span>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        style={styles.toggleBtn}
                        aria-label={collapsed ? 'Ouvrir le menu' : 'Réduire le menu'}
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {collapsed ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Nav */}
                <nav style={styles.nav}>
                    {navItems.map((item) => {
                        const active = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    ...styles.navItem,
                                    ...(active ? styles.navItemActive : {}),
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                }}
                                title={collapsed ? item.label : undefined}
                            >
                                <span style={{ ...styles.navIcon, color: active ? '#2563eb' : '#6b7280' }}>
                                    {item.icon}
                                </span>
                                {!collapsed && (
                                    <span style={{ ...styles.navLabel, color: active ? '#2563eb' : '#374151' }}>
                                        {item.label}
                                    </span>
                                )}
                                {active && !collapsed && <span style={styles.activeBar} />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info + Logout */}
                <div style={styles.sidebarFooter}>
                    <div style={{ ...styles.userRow, justifyContent: collapsed ? 'center' : 'flex-start' }}>
                        <div style={styles.avatar}>
                                <span style={styles.avatarInitials}>{getInitials(user.name)}</span>
                        </div>
                        {!collapsed && (
                            <div style={styles.userInfo}>
                                <p style={styles.userName}>{user.name}</p>
                                <p style={styles.userEmail}>{user.email}</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleLogout}
                        style={{
                            ...styles.logoutBtn,
                            justifyContent: collapsed ? 'center' : 'flex-start',
                        }}
                        title={collapsed ? 'Déconnecter' : undefined}
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
                        </svg>
                        {!collapsed && <span>Déconnecter</span>}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main style={styles.main}>
                {children}
            </main>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    shell: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
    },
    logoRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 14px 16px',
        borderBottom: '1px solid #f3f4f6',
        minHeight: '64px',
    },
    logoText: {
        fontSize: '17px',
        fontWeight: 700,
        color: '#111827',
        letterSpacing: '-0.3px',
        whiteSpace: 'nowrap',
    },
    toggleBtn: {
        background: 'none',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        cursor: 'pointer',
        padding: '4px 6px',
        color: '#9ca3af',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },
    nav: {
        flex: 1,
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 10px',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'background-color 0.15s',
        position: 'relative',
        backgroundColor: 'transparent',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
    },
    navItemActive: {
        backgroundColor: '#eff6ff',
    },
    navIcon: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },
    navLabel: {
        fontSize: '14px',
        fontWeight: 500,
    },
    activeBar: {
        position: 'absolute',
        right: '0',
        top: '25%',
        bottom: '25%',
        width: '3px',
        borderRadius: '2px 0 0 2px',
        backgroundColor: '#2563eb',
    },
    sidebarFooter: {
        borderTop: '1px solid #f3f4f6',
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    userRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 6px',
    },
    avatar: {
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        backgroundColor: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
    },
    avatarInitials: {
        fontSize: '13px',
        fontWeight: 600,
        color: '#1d4ed8',
    },
    userInfo: {
        overflow: 'hidden',
    },
    userName: {
        fontSize: '13px',
        fontWeight: 600,
        color: '#111827',
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    userEmail: {
        fontSize: '11px',
        color: '#9ca3af',
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 10px',
        background: 'none',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        color: '#ef4444',
        fontSize: '13px',
        fontWeight: 500,
        width: '100%',
        transition: 'background-color 0.15s',
        whiteSpace: 'nowrap',
    },
    main: {
        flex: 1,
        minWidth: 0,
        overflow: 'auto',
    },
};
