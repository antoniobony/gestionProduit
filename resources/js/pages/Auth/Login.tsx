import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div style={styles.shell}>
            <div style={styles.card}>
                {/* Logo / Brand */}
                <div style={styles.brand}>
                    <div style={styles.brandIcon}>M</div>
                    <h1 style={styles.brandName}>MonApp</h1>
                </div>

                <h2 style={styles.title}>Connexion</h2>
                <p style={styles.subtitle}>Bienvenue ! Entrez vos identifiants pour continuer.</p>

                <form onSubmit={submit} noValidate style={styles.form}>
                    {/* Email */}
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="email">Adresse email</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                                </svg>
                            </span>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="vous@exemple.com"
                                autoComplete="email"
                                style={{
                                    ...styles.input,
                                    ...(errors.email ? styles.inputError : {}),
                                }}
                            />
                        </div>
                        {errors.email && (
                            <p style={styles.errorMsg}>
                                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div style={styles.field}>
                        <div style={styles.labelRow}>
                            <label style={styles.label} htmlFor="password">Mot de passe</label>
                        </div>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                style={{
                                    ...styles.input,
                                    ...(errors.password ? styles.inputError : {}),
                                }}
                            />
                        </div>
                        {errors.password && (
                            <p style={styles.errorMsg}>
                                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            ...styles.btnSubmit,
                            opacity: processing ? 0.6 : 1,
                            cursor: processing ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {processing ? 'Connexion…' : 'Se connecter'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Pas encore de compte ?{' '}
                    <Link href="/register" style={styles.footerLink}>Créer un compte</Link>
                </p>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    shell: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    card: {
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        padding: '40px 36px',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '28px',
    },
    brandIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '9px',
        backgroundColor: '#2563eb',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandName: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#111827',
        margin: 0,
    },
    title: {
        fontSize: '22px',
        fontWeight: 700,
        color: '#111827',
        margin: '0 0 6px 0',
    },
    subtitle: {
        fontSize: '14px',
        color: '#6b7280',
        margin: '0 0 28px 0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    labelRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: '13px',
        fontWeight: 600,
        color: '#374151',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '12px',
        color: '#9ca3af',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
    },
    input: {
        width: '100%',
        padding: '10px 12px 10px 38px',
        fontSize: '14px',
        color: '#111827',
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        outline: 'none',
    },
    inputError: {
        borderColor: '#f87171',
        backgroundColor: '#fff7f7',
    },
    errorMsg: {
        fontSize: '12px',
        color: '#ef4444',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    } as React.CSSProperties,
    btnSubmit: {
        width: '100%',
        padding: '11px',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        marginTop: '4px',
    },
    footer: {
        textAlign: 'center' as const,
        fontSize: '13px',
        color: '#6b7280',
        marginTop: '24px',
        marginBottom: 0,
    },
    footerLink: {
        color: '#2563eb',
        fontWeight: 600,
        textDecoration: 'none',
    },
};
