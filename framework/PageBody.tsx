import { ReactNode } from 'react'
import { useWindowSizeOrLarger, WindowSize } from '.'
import ErrorBoundary from './components/ErrorBoundary'
import { useSettings } from './Settings'

export function PageBody(props: { children: ReactNode }) {
    const lg = useWindowSizeOrLarger(WindowSize.lg)
    const settings = useSettings()
    return (
        <ErrorBoundary>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    maxHeight: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'var(--pf-c-page__main-section--BackgroundColor)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        maxHeight: '100%',
                        margin: lg ? 24 : 0,
                        overflow: 'hidden',
                        border: settings.borders && lg ? 'thin solid var(--pf-global--BorderColor--100)' : undefined,
                        backgroundColor: 'var(--pf-global--BackgroundColor--100)',
                    }}
                >
                    {props.children}
                </div>
            </div>
        </ErrorBoundary>
    )
}