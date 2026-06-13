import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div style={styles.shell}>
            <div style={styles.card}>
                {/* Brand */}
                <div style={styles.brand}>
                    <div style={styles.brandIcon}>M</div>
                    <h1 style={styles.brandName}>MonApp</h1>
                </div>

                <h2 style={styles.title}>Créer un compte</h2>
                <p style={styles.subtitle}>Rejoignez-nous en quelques secondes.</p>

                <form onSubmit={submit} noValidate style={styles.form}>
                    {/* Nom */}
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="name">Nom complet</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Jean Dupont"
                                autoComplete="name"
                                style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
                            />
                        </div>
                        {errors.name && <p style={styles.errorMsg}>{errors.name}</p>}
                    </div>

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
                                style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                            />
                        </div>
                        {errors.email && <p style={styles.errorMsg}>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="password">Mot de passe</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Minimum 8 caractères"
                                autoComplete="new-password"
                                style={{ ...styles.input, ...(errors.password ? styles.inputError : {}) }}
                            />
                        </div>
                        {errors.password && <p style={styles.errorMsg}>{errors.password}</p>}
                    </div>

                    {/* Confirm password */}
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="password_confirmation">Confirmer le mot de passe</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </span>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                style={{ ...styles.input, ...(errors.password_confirmation ? styles.inputError : {}) }}
                            />
                        </div>
                        {errors.password_confirmation && <p style={styles.errorMsg}>{errors.password_confirmation}</p>}
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
                        {processing ? 'Création du compte…' : 'Créer mon compte'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Déjà un compte ?{' '}
                    <Link href="/login" style={styles.footerLink}>Se connecter</Link>
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
        gap: '16px',
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
    },
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
