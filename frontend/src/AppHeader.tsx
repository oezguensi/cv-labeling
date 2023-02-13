import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, HeaderPanel, Switcher, SwitcherItem, SwitcherDivider } from '@carbon/react'
import { BrightnessContrast, Information, Translate } from '@carbon/react/icons'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from "i18next"

const AppHeader: FC<{ setTheme: any }> = ({ setTheme }) => {
    const { t } = useTranslation()

    const [rightPanelIsExpanded, setrightPanelIsExpanded] = useState<boolean>(false)

    return (
        <Header aria-label="IBM Platform Name">
            <HeaderName href="#" prefix="CV">
                {t('AppHeader.HeaderName')}
            </HeaderName>
            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label={t('AppHeader.HeaderGlobalAction1.aria-label')} onClick={() => { setTheme((oldTheme: string) => oldTheme === 'white' ? 'g90' : 'white') }}>
                    <BrightnessContrast size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label={t('AppHeader.HeaderGlobalAction2.aria-label')} onClick={() => { setrightPanelIsExpanded(oldValue => !oldValue) }}>
                    <Translate size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label={t('AppHeader.HeaderGlobalAction3.aria-label')} tooltipAlignment="end">
                    <Information size={20} />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
            <HeaderPanel aria-label="Header Panel" expanded={rightPanelIsExpanded} >
                <Switcher aria-label="Switcher Container">
                    {Object.keys(i18n.options.resources).map((key: string) => {
                        return (
                            <SwitcherItem key={`SwitcherItem-${key}`} isSelected={i18n.language === key} aria-label={key}
                                onClick={() => {
                                    setrightPanelIsExpanded(false)
                                    i18n.changeLanguage(key)
                                }}>
                                {key.toUpperCase()}
                            </SwitcherItem>
                        )
                    })}
                    <SwitcherDivider />
                </Switcher>
            </HeaderPanel>

        </Header>
    )
}

export default AppHeader