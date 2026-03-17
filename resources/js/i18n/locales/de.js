export default {
    dashboard: 'Dashboard',
    orders: 'Bestellungen',
    stockCheckRequests: 'Lagerprüfanfragen',
    quoteRequests: 'Angebotsanfragen',
    reservations: 'Reservierungen',
    customers: 'Kunden',
    bulletin: 'Pinnwand',
    categories: 'Menükategorien',
    category: 'Menükategorie',
    content_system: 'Content-System',
    products: 'Menüpunkte',
    roles: 'Rollen',
    users: 'Benutzer',
    mail_logs: 'E-Mail-Protokolle',
    reset_password: 'Passwortänderung',
    // Added for layouts and dashboards
    restaurants: 'Restaurants',
    tenants: 'Restaurants',
    settings: 'Restaurant-Einstellungen',
    personal_settings: 'Persönliche Einstellungen',
    logout: 'Abmelden',
    profile: 'Profil',
    role: 'Rolle',
    about: 'Über uns',
    // normalized keys for layouts
    contact: 'Kontakt',
    reservation: 'Reservierung',
    // alias kept if used elsewhere
    Contact: 'Kontakt',
    privacy: 'Datenschutz',
    terms: 'AGB',
    aboutText: 'Wir bieten umfassende Restaurant-Management-Lösungen, um Unternehmen beim Wachstum und Erfolg im modernen digitalen Zeitalter zu unterstützen.',
    passwordChange: 'Passwortänderung',
    restaurantSettings: 'Restaurant-Einstellungen',
    notifications: 'Benachrichtigungen',
    subscribers: 'Abonnenten',
    emailSetting: 'E-Mail-Einstellungen',
    contactReqs: 'Kontaktanfragen',
    stockCheck: 'Lagerprüfung',
    logoutSuccess: 'Erfolgreich abgemeldet',
    youHaveBeenLoggedOut: 'Sie wurden von Ihrem Konto abgemeldet.',
    "logoutFailed": "Abmeldung fehlgeschlagen",
    "somethingWentWrong": "Etwas ist schief gelaufen, bitte versuchen Sie es erneut.",
    changeLanguage: 'Sprache ändern',
    businessEmail: 'Geschäfts-E-Mail',
    // Footer & Cart additions for tenant frontend layout
    cart: {
        title: 'Ihr Warenkorb',
        total: 'Gesamt:',
        checkout: 'Zur Kasse',
        empty: 'Ihr Warenkorb ist leer.'
    },

    //Main Home Page
    welcome: 'Willkommen bei Ai Restro 360',
    subtitle: 'Ihre ultimative Restaurant-Management-Lösung',
    getStarted: 'LOSLEGEN',
    learnMore: 'MEHR ERFAHREN',
    whyChoose: 'Warum Ai Restro 360 wählen?',


    // Home Page

    about_us: 'Über uns',
    // Tenant About Page
    about: {
        title: 'Über uns',
        subtitle: 'Wir sind bestrebt, die Restaurantbranche durch innovative digitale Lösungen zu revolutionieren.',
        description: 'Unsere Plattform bietet umfassende Restaurant-Management-Tools, die Unternehmen dabei helfen, ihre Abläufe zu optimieren, die Effizienz zu steigern und außergewöhnliche Kundenerlebnisse zu bieten. Von der Bestellverwaltung bis hin zu Analysen bieten wir alles, was Sie für den Erfolg im heutigen wettbewerbsintensiven Markt benötigen.',
        stat1: { value: '100+', label: 'Betreute Restaurants' },
        stat2: { value: '99%', label: 'Kundenzufriedenheit' },
        whyChoose: 'Warum uns wählen',
        features: {
            innovation: { title: 'Innovation', desc: 'Hochmoderne Technologie, um Sie der Konkurrenz voraus zu halten' },
            support: { title: 'Support', desc: '24/7 dedizierter Support für Ihren Erfolg' },
            reliability: { title: 'Zuverlässigkeit', desc: 'Sichere und stabile Plattform, auf die Sie sich verlassen können' }
        }
    },

    // Navigation\
    nav: {
        home: 'Startseite',
        features: 'Funktionen',
        pricing: 'Preise',
        contact: 'Kontakt',
        login: 'Anmelden',
        register: 'Registrieren',
        users: 'Benutzer',
        roles_permissions: 'Rollen & Berechtigungen',
        restaurants: 'Restaurants',
        logout: 'Abmelden',
        profile: 'Profil',
        foodOrdering: 'Essensbestellung',
        restaurantServices: 'Restaurant-Services',
        pricing: 'Preise',
        getAccess: 'Jetzt Zugang erhalten',
        logintorestaurant: 'Zum Restaurant-Login',
    },
    login_modal: {
        restaurantLoginTitle: 'Restaurant-Anmeldung',
        emailLabel: 'Geben Sie Ihre Restaurant-E-Mail ein',
        email_form_text: 'Geben Sie die E-Mail-Adresse ein, die mit Ihrem Restaurantkonto verknüpft ist',
        passwordLabel: 'Passwort',
        loginButton: 'Weiter zur Anmeldung',
        cancelButton: 'Abbrechen',
        processing: 'Wird verarbeitet...',
        forgotPassword: 'Passwort vergessen?',
        noAccount: 'Sie haben noch kein Restaurantkonto?',
        signUp: 'Hier registrieren',
    },

    topbar: {
        email: 'E-Mail',
        phone: import.meta.env.VITE_CONTACT_PHONE || '1300 213 313',
        language: 'Sprache'
    },
    footer: {
        aboutUs: 'Über uns',
        contactUs: 'Kontakt',
        privacy: 'Datenschutzrichtlinie',
        terms: 'Nutzungsbedingungen',
        location: 'Unser Standort',
        designedBy: 'Entworfen & Entwickelt von ApimsTec',
        aboutText: 'Wir bieten umfassende Restaurant-Management-Lösungen, um Unternehmen beim Wachstum und Erfolg im modernen digitalen Zeitalter zu unterstützen.',
        quickLinks: {
            quickLinks: 'Quick Links',
            title: 'Quick Links',
            features: 'Funktionen',
            pricing: 'Preise',
        },
        contactInfo: 'Kontaktinformationen',
        address: import.meta.env.VITE_CONTACT_ADDRESS || '',
        phone: import.meta.env.VITE_CONTACT_PHONE || '1300 213 313',
        hours: import.meta.env.VITE_CONTACT_HOURS || 'Mo - Fr: 9:00 - 18:00',
        copyright: '© 2025 Restaurant Management System. Alle Rechte vorbehalten.',
        about: {
            title: 'Über uns',
            description: 'Wir bieten umfassende Restaurant-Management-Lösungen, um Unternehmen beim Wachstum und Erfolg im modernen digitalen Zeitalter zu unterstützen.'
        },
        contact: {
            title: 'Kontaktinformationen',
            address: import.meta.env.VITE_CONTACT_ADDRESS || '"10 Thomas St Yarraville VIC 3013 Australia',
            phone: import.meta.env.VITE_CONTACT_PHONE || '1300 213 313',
            hours: import.meta.env.VITE_CONTACT_HOURS || 'Mo - Fr: 9:00 - 18:00'
        }
    },
    // Home
    // Privacy Page
    privacy: {
        title: 'Datenschutzrichtlinie',
        lastUpdated: 'Zuletzt aktualisiert: März 2025',
        section1Title: '1. Informationen, die wir sammeln',
        section1Intro: 'Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, einschließlich:',
        section1Item1: 'Name und Kontaktinformationen',
        section1Item2: 'Restaurantdetails und Geschäftsinformationen',
        section1Item3: 'Zahlungsinformationen',
        section1Item4: 'Nutzungsdaten und Präferenzen',
        section2Title: '2. Wie wir Ihre Informationen verwenden',
        section2Intro: 'Wir verwenden die gesammelten Informationen, um:',
        section2Item1: 'Unsere Dienste bereitzustellen und zu warten',
        section2Item2: 'Ihre Transaktionen zu bearbeiten',
        section2Item3: 'Ihnen wichtige Updates und Benachrichtigungen zu senden',
        section2Item4: 'Unsere Dienste zu verbessern und neue Funktionen zu entwickeln',
        section2Item5: 'Vor Betrug und unbefugtem Zugriff zu schützen',
        section3Title: '3. Weitergabe von Informationen',
        section3Intro: 'Wir verkaufen Ihre persönlichen Daten nicht. Wir können Ihre Informationen teilen mit:',
        section3Item1: 'Dienstleistern, die bei unseren Betriebsabläufen helfen',
        section3Item2: 'Beratern und Consultants',
        section3Item3: 'Strafverfolgungsbehörden, wenn gesetzlich vorgeschrieben',
        section4Title: '4. Datensicherheit',
        section4Intro: 'Wir setzen angemessene technische und organisatorische Maßnahmen um, um Ihre persönlichen Daten zu schützen, einschließlich:',
        section4Item1: 'Verschlüsselung sensibler Daten',
        section4Item2: 'Regelmäßige Sicherheitsbewertungen',
        section4Item3: 'Zugriffskontrollen und Authentifizierung',
        section4Item4: 'Sichere Datenspeicherung und -übertragung',
        section5Title: '5. Ihre Rechte',
        section5Intro: 'Sie haben das Recht:',
        section5Item1: 'Auf Ihre persönlichen Daten zuzugreifen',
        section5Item2: 'Ungenau Informationen zu berichtigen',
        section5Item3: 'Die Löschung Ihrer Daten zu beantragen',
        section5Item4: 'Marketing-Kommunikation abzubestellen',
        section6Title: '6. Kontaktieren Sie uns',
        section6Intro: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter:',
        email: 'E-Mail',
        phone: 'Telefon',
        address: 'Adresse'
    },
    home: {
        // Hero Section
        hero: {
            title: 'Erstellen Sie Ihre Restaurant-Website in Minuten',
            subtitle: 'Erstellen Sie eine schöne Website für Ihr Restaurant. Keine Programmierkenntnisse erforderlich. Erhalten Sie Online-Bestellungen, Tischreservierungen und verwalten Sie Ihr Geschäft an einem Ort.',
            getStarted: 'LOSLEGEN',
            learnMore: 'MEHR ERFAHREN'
        },

        // About Section
        about: {
            title: 'All-in-One-Restaurant-Plattform',
            subtitle: 'Wir helfen Restaurants, ihr Geschäft online zu erweitern. Erstellen Sie eine Website, nehmen Sie Bestellungen entgegen, verwalten Sie Buchungen und verbinden Sie sich mit Kunden - alles von einer einfachen Plattform aus.',
            heading: 'Alles, was Ihr Restaurant braucht',
            description1: 'Wir verstehen, dass die Führung eines Restaurants harte Arbeit ist. Deshalb haben wir eine Plattform entwickelt, die das Online-Gehen einfach macht. Sie müssen kein Technikexperte sein oder Tausende für die Website-Entwicklung ausgeben. Unsere einfachen Tools ermöglichen es Ihnen, in Minuten eine professionelle Website zu erstellen.',
            description2: 'Egal, ob Sie Online-Bestellungen entgegennehmen, Kunden Tische reservieren lassen oder einfach Ihre Speisekarte der Welt zeigen möchten - wir haben alles für Sie. Sie können unsere kostenlose Subdomain nutzen oder Ihre eigene benutzerdefinierte Domain verbinden. Keine Hosting-Gebühren, keine komplizierte Einrichtung - konzentrieren Sie sich auf Ihr Essen, während wir uns um die Technik kümmern.',
            readMore: 'Mehr lesen'
        },

        // Features Section
        whyChoose: 'Warum unsere Plattform wählen?',
        features: {
            quickSetup: {
                title: 'Schnelle Einrichtung',
                description: 'Bringen Sie Ihre Restaurant-Website in nur 5 Minuten online. Keine Programmierkenntnisse erforderlich. Geben Sie einfach Ihre Daten ein und Sie sind startbereit.'
            },
            mobileFriendly: {
                title: 'Mobilfreundlich',
                description: 'Ihre Website funktioniert perfekt auf Telefonen, Tablets und Computern. Kunden können von jedem Gerät aus Essen bestellen und Tische reservieren.'
            },
            easyManagement: {
                title: 'Einfache Verwaltung',
                description: 'Aktualisieren Sie Ihre Speisekarte, verwalten Sie Bestellungen und verfolgen Sie Ihr Geschäft von einem einfachen Dashboard aus. Alles, was Sie brauchen, an einem Ort.'
            }
        },

        // Services Section
        services: {
            title: 'Was wir anbieten',
            subtitle: 'Alles, was Sie benötigen, um Ihr Restaurant online zu führen',
            websiteBuilder: {
                title: 'Website-Builder',
                description: 'Erstellen Sie in Minuten eine schöne Website für Ihr Restaurant. Nutzen Sie unsere kostenlose Subdomain oder verbinden Sie Ihre eigene benutzerdefinierte Domain.'
            },
            onlineOrdering: {
                title: 'Online-Bestellungen',
                description: 'Lassen Sie Kunden direkt von Ihrer Website aus Essen bestellen. Nehmen Sie Online-Zahlungen entgegen und verwalten Sie Bestellungen einfach.'
            },
            tableReservations: {
                title: 'Tischreservierungen',
                description: 'Kunden können online Tische buchen. Verwalten Sie die Verfügbarkeit und Reservierungen Ihres Restaurants von Ihrem Dashboard aus.'
            },
            inventoryManagement: {
                title: 'Bestandsverwaltung',
                description: 'Verfolgen Sie Ihre Lagerbestände und tätigen Sie Sammelbestellungen bei Herstellern. Laufen Sie nie wieder aus Zutaten aus.'
            }
        },

        // Platform Benefits Section
        platformBenefits: {
            title: 'Eine Plattform, alles was Sie brauchen',
            subtitle: 'Hören Sie auf, mehrere Apps und Websites zu verwenden. Verwalten Sie Ihr gesamtes Restaurantgeschäft von einem Ort aus.',
            noHostingFees: {
                title: 'Keine Hosting-Gebühren',
                description: 'Nutzen Sie unsere kostenlose Subdomain oder verbinden Sie Ihre eigene Domain. Keine monatlichen Hosting-Kosten.'
            },
            mobileReady: {
                title: 'Mobil bereit',
                description: 'Ihre Website funktioniert perfekt auf allen Geräten - Telefonen, Tablets und Computern.'
            },
            onlinePayments: {
                title: 'Online-Zahlungen',
                description: 'Akzeptieren Sie Kreditkarten, digitale Geldbörsen und Bargeldzahlungen von Ihren Kunden.'
            },
            businessReports: {
                title: 'Geschäftsberichte',
                description: 'Verfolgen Sie Ihre Verkäufe, Bestellungen und Kundendaten, um Ihr Geschäft intelligenter zu erweitern.'
            }
        },

        // How It Works Section
        howItWorks: {
            title: 'So erstellen Sie Ihre Restaurant-Website',
            subtitle: 'Bringen Sie Ihr Restaurant in nur 3 einfachen Schritten online',
            step1: {
                title: 'Geben Sie Ihren Restaurantnamen ein',
                description: 'Wenn Ihr Restaurant bereits bei Google gelistet ist, geben Sie einfach den Namen ein und wir importieren automatisch alle Ihre Informationen - Adresse, Telefon, Öffnungszeiten und mehr.'
            },
            step2: {
                title: 'Passen Sie Ihre Website an',
                description: 'Fügen Sie Ihre Speisekarte, Fotos hinzu und passen Sie das Design an den Stil Ihres Restaurants an. Keine Programmierung erforderlich - einfach per Drag & Drop.'
            },
            step3: {
                title: 'Beginnen Sie mit der Annahme von Bestellungen',
                description: 'Ihre Website ist live! Beginnen Sie sofort mit der Annahme von Online-Bestellungen, Tischreservierungen und dem Ausbau Ihres Geschäfts.'
            },
            cta: 'Starten Sie mit dem Aufbau Ihrer Website'
        },

        // Google Integration Section
        googleIntegration: {
            title: 'Bereits bei Google? Wir importieren alles',
            subtitle: 'Wenn Ihr Restaurant bereits bei Google gelistet ist, können wir automatisch alle Ihre Informationen importieren. Sie müssen nicht alles erneut eingeben!',
            features: [
                'Restaurantname und -beschreibung',
                'Adresse und Kontaktinformationen',
                'Öffnungszeiten und Geschäftstage',
                'Fotos und Kundenbewertungen',
                'Kategorie und Küchenart'
            ],
            cta: 'Google-Import ausprobieren'
        },

        // Features Comparison Section
        comparison: {
            title: 'Alles, was Sie für den Online-Erfolg benötigen',
            subtitle: 'Vergleichen Sie unsere Plattform mit traditioneller Website-Entwicklung',
            traditional: {
                title: 'Traditionelle Website-Entwicklung',
                features: [
                    'Kosten: 3.000 - 10.000 €+',
                    'Bauzeit: 2-6 Monate',
                    'Monatliche Hosting-Gebühren (20-100 €)',
                    'Entwickler müssen eingestellt werden',
                    'Schwierig, Inhalte zu aktualisieren'
                ]
            },
            ourPlatform: {
                title: 'Unsere Restaurant-Plattform',
                features: [
                    'Kostenlos starten, keine Einrichtungsgebühren',
                    'In 5 Minuten fertig',
                    'Keine Hosting-Gebühren',
                    'Keine technischen Kenntnisse erforderlich',
                    'Einfach jederzeit zu aktualisieren'
                ]
            }
        },

        // Customer Success Section
        customerSuccess: {
            title: 'Restaurants lieben unsere Plattform',
            subtitle: 'Sehen Sie, wie andere Restaurants ihr Geschäft mit uns erweitern',
            testimonials: {
                1: {
                    name: 'Pizzapalast',
                    text: 'Wir haben unsere Online-Bestellungen in nur 2 Monaten um 300 % gesteigert. Die Einrichtung der Website war so einfach!'
                },
                2: {
                    name: 'Café Delight',
                    text: 'Tischreservierungen sind jetzt automatisiert. Keine Telefonate mehr während der Stoßzeiten!'
                },
                3: {
                    name: 'Burgerhaus',
                    text: 'Das Bestandsmanagement hilft uns, nie ohne Zutaten dazustehen. Ein echter Gamechanger!'
                }
            }
        },

        // FAQ Section
        faq: {
            title: 'Häufig gestellte Fragen',
            subtitle: 'Alles, was Sie über unsere Plattform wissen müssen',
            questions: [
                {
                    question: 'Wie viel kostet es, eine Restaurant-Website zu erstellen?',
                    answer: 'Sie können kostenlos starten! Wir bieten einen kostenlosen Plan mit grundlegenden Funktionen an. Premium-Pläne beginnen bei nur 29 €/Monat und beinhalten erweiterte Funktionen wie Online-Bestellungen, Tischreservierungen und Bestandsverwaltung.'
                },
                {
                    question: 'Kann ich meinen eigenen Domain-Namen verwenden?',
                    answer: 'Ja! Sie können unsere kostenlose Subdomain (ihrrestaurant.unsereplattform.com) nutzen oder Ihre eigene benutzerdefinierte Domain (ihrrestaurant.com) verbinden. Keine zusätzlichen Hosting-Gebühren erforderlich.'
                },
                {
                    question: 'Wie lange dauert die Einrichtung?',
                    answer: 'Wenn Ihr Restaurant bei Google gelistet ist, können wir alle Ihre Informationen automatisch importieren und Sie haben in nur 5 Minuten eine grundlegende Website. Sie können sie dann in Ihrem eigenen Tempo weiter anpassen.'
                },
                {
                    question: 'Benötige ich technische Kenntnisse?',
                    answer: 'Überhaupt nicht! Unsere Plattform ist benutzerfreundlich gestaltet. Sie können Ihre Website mit einfachen Drag-and-Drop-Tools erstellen und verwalten. Keine Programmierkenntnisse erforderlich.'
                }
            ]
        },

        // Recent Restaurants Section
        recentRestaurants: {
            title: 'Kürzlich registrierte Restaurants',
            subtitle: 'Entdecken Sie fantastische Restaurants, die sich kürzlich unserer Plattform angeschlossen haben',
            viewRestaurant: 'Restaurant ansehen',
            viewAllRestaurants: 'Alle Restaurants anzeigen',
            loading: 'Wird geladen...',
            loadingRestaurants: 'Letzte Restaurants werden geladen...',
            tryAgain: 'Erneut versuchen',
            restaurantsGrid: {
                cuisine: 'Küche',
                phone: 'Telefon',
                vegetarianOptions: 'Vegetarische Optionen',
                status: 'Status'
            },
        },

        // Reservation Section
        reservation: {
            title: 'Reservierung vornehmen',
            subtitle: 'Buchen Sie online Ihren Tisch und genießen Sie ein großartiges Restaurant-Erlebnis',
            contact: {
                call: 'Rufen Sie uns an: 1300 213 313',
                // hours: 'Geöffnet: Mo-So 11:00 - 22:00'
            },
            form: {
                name: 'Ihr Name',
                email: 'E-Mail-Adresse',
                guests: 'Anzahl der Gäste',
                bookNow: 'Jetzt buchen'
            }
        },

        // Call to Action Section
        cta: {
            title: 'Bereit, Ihr Restaurant online zu erweitern?',
            subtitle: 'Schließen Sie sich Tausenden von Restaurants an, die bereits unsere Plattform nutzen, um ihren Umsatz zu steigern und mehr Kunden zu erreichen.',
            startFreeTrial: 'KOSTENLOSE TESTVERSION STARTEN',
            noCreditCard: 'Keine Kreditkarte erforderlich',
            getStarted: 'LOSLEGEN'
        }
    },

    // Tenant Reservation Page
    reservation: {
        title: 'Reservierung',
        subtitle: 'Wir bieten kostenlose, sichere und sofort bestätigte Online-Reservierungen.',
        formTitle: 'Buchen Sie online einen Tisch. Details gehen an Ihre E-Mail.',
        fullName: 'Vollständiger Name*',
        fullNameTip: 'Geben Sie Ihren vollständigen Namen ein',
        phoneNumber: 'Telefonnummer*',
        phoneNumberTip: 'Geben Sie Ihre Telefonnummer ein',
        email: 'E-Mail*',
        emailTip: 'Geben Sie Ihre E-Mail-Adresse ein',
        date: 'Datum*',
        dateTip: 'Reservierungsdatum auswählen',
        time: 'Uhrzeit*',
        timeTip: 'Reservierungszeit auswählen',
        guests: 'Gäste*',
        guestsTip: 'Anzahl der Gäste',
        message: 'Nachricht',
        messageTip: 'Fügen Sie besondere Wünsche oder Notizen hinzu',
        processing: 'Wird verarbeitet...',
        submit: 'RESERVIERUNG VORNEHMEN'
    },

    // Food Ordering Page
    foodOrdering: {
        // Hero Section
        hero: {
            title: 'Komplettes Restaurant-Management-System',
            subtitle: 'Alles, was Sie benötigen, um Ihr Restaurant online zu führen. Nehmen Sie Bestellungen entgegen, verwalten Sie Tische, organisieren Sie Ihre Speisekarte und erweitern Sie Ihr Geschäft - alles von einer einfachen Plattform aus.',
            startFreeTrial: 'Kostenlose Testversion starten',
            learnMore: 'Mehr erfahren'
        },

        // Features Overview
        featuresOverview: {
            title: 'Alles, was Ihr Restaurant braucht',
            subtitle: 'Verwalten Sie Ihr gesamtes Restaurantgeschäft von einem einfachen Dashboard aus',
            onlineOrdering: {
                title: 'Online-Bestellungen',
                description: 'Lassen Sie Kunden direkt von Ihrer Website aus Essen bestellen. Nehmen Sie Online-Zahlungen entgegen und verwalten Sie Bestellungen einfach.'
            },
            tableReservations: {
                title: 'Tischreservierungen',
                description: 'Kunden können online Tische buchen. Verwalten Sie die Verfügbarkeit und Reservierungen Ihres Restaurants von Ihrem Dashboard aus.'
            },
            menuManagement: {
                title: 'Menüverwaltung',
                description: 'Organisieren Sie Ihre Speisekarte mit Kategorien und Artikeln. Kontrollieren Sie, was sichtbar ist, und sortieren Sie alles einfach.'
            },
            userManagement: {
                title: 'Benutzerverwaltung',
                description: 'Verwalten Sie Ihr Personal mit verschiedenen Rollen und Berechtigungen. Kontrollieren Sie, wer was in Ihrem System tun darf.'
            }
        },

        // Online Ordering System
        onlineOrdering: {
            title: 'Online-Essensbestellsystem',
            subtitle: 'Verwandeln Sie Ihr Restaurant in ein Online-Geschäft. Lassen Sie Kunden von Ihrer Website aus Essen bestellen und steigern Sie Ihren Umsatz.',
            feature1: 'Kunden können Ihre Speisekarte durchsuchen und online Bestellungen aufgeben',
            feature2: 'Akzeptieren Sie Kreditkarten, digitale Geldbörsen und Bargeldzahlungen',
            feature3: 'Erhalten Sie sofortige Benachrichtigungen bei neuen Bestellungen',
            feature4: 'Verfolgen Sie den Bestellstatus und verwalten Sie Lieferzeiten',
            feature5: 'Bestellverlauf und Kundendetails einsehen'
        },

        // Table Reservation System
        tableReservation: {
            title: 'Tischreservierungssystem',
            subtitle: 'Hören Sie auf, Telefonanrufe für Reservierungen entgegenzunehmen. Lassen Sie Kunden online Tische buchen und verwalten Sie die Verfügbarkeit Ihres Restaurants einfach.',
            feature1: 'Kunden können Tische für bestimmte Daten und Zeiten buchen',
            feature2: 'Legen Sie die Öffnungszeiten und verfügbaren Tische Ihres Restaurants fest',
            feature3: 'Erhalten Sie sofortige Benachrichtigungen für neue Reservierungen',
            feature4: 'Verwalten Sie die Tischverfügbarkeit in Echtzeit',
            feature5: 'Senden Sie automatisch Bestätigungs-E-Mails an Kunden'
        },

        // Menu Management System
        menuManagement: {
            title: 'Intelligente Menüverwaltung',
            subtitle: 'Organisieren Sie Ihre Speisekarte mit Kategorien und Artikeln. Kontrollieren Sie, was Kunden auf Ihrer Website sehen.',
            categoryManagement: {
                title: 'Kategorieverwaltung',
                feature1: 'Erstellen Sie Menükategorien (Vorspeisen, Hauptgerichte, Desserts usw.)',
                feature2: 'Sortieren Sie Kategorien in beliebiger Reihenfolge',
                feature3: 'Aktivieren oder deaktivieren Sie gesamte Kategorien',
                feature4: 'Wenn Sie eine Kategorie deaktivieren, werden alle darin enthaltenen Artikel ausgeblendet'
            },
            itemManagement: {
                title: 'Artikelverwaltung',
                feature1: 'Fügen Sie Speiseartikel unter jeder Kategorie hinzu',
                feature2: 'Legen Sie Preise, Beschreibungen und Fotos für jeden Artikel fest',
                feature3: 'Sortieren Sie Artikel innerhalb jeder Kategorie',
                feature4: 'Markieren Sie Artikel als verfügbar oder nicht verfügbar',
                feature5: 'Aktualisieren Sie die Speisekarte jederzeit ohne technische Hilfe'
            },
            smartControl: {
                title: 'Intelligente Kontrolle',
                description: 'Wenn Sie eine Kategorie deaktivieren, werden alle Artikel in dieser Kategorie automatisch für Kunden auf Ihrer Website unsichtbar.'
            }
        },
        // User and Role Management
        userManagement: {
            title: 'Benutzer- und Rollenverwaltung',
            subtitle: 'Kontrollieren Sie, wer auf Ihr System zugreifen kann und was er tun darf',
            roles: {
                admin: {
                    title: 'Admin-Rolle',
                    description: 'Vollzugriff auf alles - verwalten Sie Menü, Bestellungen, Reservierungen, Benutzer und Systemeinstellungen.'
                },
                manager: {
                    title: 'Manager-Rolle',
                    description: 'Kann Bestellungen, Reservierungen und Menüpunkte verwalten. Kann keine Systemeinstellungen oder Benutzerrollen ändern.'
                },
                staff: {
                    title: 'Mitarbeiter-Rolle',
                    description: 'Kann Bestellungen und Reservierungen einsehen. Eingeschränkter Zugriff für grundlegende Restaurantabläufe.'
                }
            },
            control: {
                title: 'Was Sie kontrollieren können:',
                feature1: 'Erstellen Sie verschiedene Benutzerrollen mit spezifischen Berechtigungen',
                feature2: 'Fügen Sie Mitarbeiter einfach hinzu oder entfernen Sie sie',
                feature3: 'Kontrollieren Sie, wer Bestellungen einsehen, das Menü verwalten oder Einstellungen ändern darf',
                feature4: 'Verfolgen Sie, wer welche Änderungen in Ihrem System vorgenommen hat'
            },
            security: {
                title: 'Sicherheitsfunktionen:',
                feature1: 'Sicherer Login für alle Benutzer',
                feature2: 'Passwortschutz für sensible Bereiche',
                feature3: 'Aktivitätsprotokolle zur Verfolgung aller Änderungen',
                feature4: 'Einfaches Entfernen des Zugriffs, wenn Mitarbeiter gehen'
            }
        },

        // How It Works
        howItWorks: {
            title: 'So funktioniert es',
            subtitle: 'Bringen Sie Ihr Restaurant in nur 3 einfachen Schritten online',
            step1: {
                title: 'Richten Sie Ihr Menü ein',
                description: 'Erstellen Sie Kategorien und fügen Sie Ihre Speiseartikel hinzu. Laden Sie Fotos hoch und legen Sie Preise fest. Organisieren Sie alles nach Ihren Wünschen.'
            },
            step2: {
                title: 'Konfigurieren Sie die Einstellungen',
                description: 'Legen Sie Ihre Öffnungszeiten, Tischverfügbarkeit und Zahlungsoptionen fest. Fügen Sie Ihre Mitarbeiter mit entsprechenden Rollen hinzu.'
            },
            step3: {
                title: 'Beginnen Sie mit der Annahme von Bestellungen',
                description: 'Ihr Restaurant ist jetzt online! Beginnen Sie sofort mit der Annahme von Essensbestellungen und Tischreservierungen von Kunden.'
            }
        },

        // Call to Action
        cta: {
            title: 'Bereit, Ihr Restaurant zu transformieren?',
            subtitle: 'Schließen Sie sich Tausenden von Restaurants an, die bereits unsere Plattform nutzen, um ihren Umsatz zu steigern und mehr Kunden zu erreichen.',
            startFreeTrial: 'Kostenlose Testversion starten',
            contactSales: 'Vertrieb kontaktieren'
        }
    },

    // Restaurant Services Page
    restaurantServices: {
        hero: {
            title: 'Alles, was Ihr Restaurant für den Online-Erfolg braucht',
            subtitle: 'Erhalten Sie ein komplettes Restaurant-Management-System, das Ihre eigene Website, Online-Bestellungen, Tischreservierungen, Menüverwaltung und vieles mehr umfasst. Alles, was Sie benötigen, um Ihr Restaurantgeschäft zu erweitern.',
            startFreeTrial: 'Kostenlose Testversion starten',
            viewAllServices: 'Alle Services anzeigen'
        },
        mainServices: {
            title: 'Komplette Restaurant-Management-Plattform',
            subtitle: 'Eine Plattform, alles was Sie brauchen, um Ihr Restaurant online zu führen und Ihr Geschäft zu erweitern',
            websiteBuilder: {
                title: 'Ihre eigene Restaurant-Website',
                subtitle: 'Erhalten Sie eine professionelle Website für Ihr Restaurant mit Ihrem eigenen Domain-Namen oder nutzen Sie unsere kostenlose Subdomain.',
                feature1: 'Professionelles Design, das zum Stil Ihres Restaurants passt',
                feature2: 'Mobilfreundlich - funktioniert perfekt auf Telefonen und Tablets',
                feature3: 'Keine Hosting-Gebühren - wir kümmern uns um alles',
                feature4: 'Einfach zu aktualisierende Speisekarte, Fotos und Informationen',
                feature5: 'SEO-optimiert, um Kunden zu helfen, Sie online zu finden'
            },
            onlineOrdering: {
                title: 'Online-Essensbestellsystem',
                subtitle: 'Lassen Sie Kunden direkt von Ihrer Website aus Essen bestellen. Nehmen Sie Online-Zahlungen entgegen und verwalten Sie Bestellungen einfach.',
                feature1: 'Kunden können Ihre Speisekarte 24/7 durchsuchen und Bestellungen aufgeben',
                feature2: 'Akzeptieren Sie Kreditkarten, digitale Geldbörsen und Bargeldzahlungen',
                feature3: 'Erhalten Sie sofortige Benachrichtigungen bei neuen Bestellungen',
                feature4: 'Verfolgen Sie den Bestellstatus und verwalten Sie Lieferzeiten',
                feature5: 'Bestellverlauf und Kundendetails einsehen'
            },
            tableReservation: {
                title: 'Tischreservierungssystem',
                subtitle: 'Hören Sie auf, Telefonanrufe für Reservierungen entgegenzunehmen. Lassen Sie Kunden online Tische buchen und verwalten Sie Ihre Verfügbarkeit.',
                feature1: 'Kunden können Tische für bestimmte Daten und Zeiten buchen',
                feature2: 'Legen Sie die Öffnungszeiten und verfügbaren Tische Ihres Restaurants fest',
                feature3: 'Erhalten Sie sofortige Benachrichtigungen für neue Reservierungen',
                feature4: 'Verwalten Sie die Tischverfügbarkeit in Echtzeit',
                feature5: 'Senden Sie automatisch Bestätigungs-E-Mails an Kunden'
            },
            menuManagement: {
                title: 'Intelligente Menüverwaltung',
                subtitle: 'Organisieren Sie Ihre Speisekarte mit Kategorien und Artikeln. Kontrollieren Sie, was Kunden auf Ihrer Website sehen.',
                feature1: 'Erstellen Sie Menükategorien (Vorspeisen, Hauptgerichte usw.)',
                feature2: 'Fügen Sie Speiseartikel mit Preisen, Beschreibungen und Fotos hinzu',
                feature3: 'Sortieren Sie Kategorien und Artikel in beliebiger Reihenfolge',
                feature4: 'Aktivieren oder deaktivieren Sie Kategorien und Artikel',
                feature5: 'Aktualisieren Sie die Speisekarte jederzeit ohne technische Hilfe'
            }
        },
        additionalServices: {
            title: 'Weitere Services für Ihr Unternehmen',
            subtitle: 'Zusätzliche Tools und Funktionen, um die Führung Ihres Restaurants zu erleichtern',
            userManagement: {
                title: 'Benutzer- & Rollenverwaltung',
                subtitle: 'Kontrollieren Sie, wer auf Ihr System zugreifen kann und was er tun darf.',
                feature1: 'Erstellen Sie verschiedene Benutzerrollen (Admin, Manager, Mitarbeiter)',
                feature2: 'Legen Sie spezifische Berechtigungen für jede Rolle fest',
                feature3: 'Fügen Sie Mitarbeiter einfach hinzu oder entfernen Sie sie',
                feature4: 'Verfolgen Sie, wer welche Änderungen vorgenommen hat'
            },
            inventoryManagement: {
                title: 'Bestandsverwaltung',
                subtitle: 'Behalten Sie Ihre Zutaten und Lieferungen im Blick.',
                feature1: 'Verfolgen Sie Zutatenmengen und -kosten',
                feature2: 'Erhalten Sie Warnungen, wenn Artikel zur Neige gehen',
                feature3: 'Generieren Sie automatisch Bestellungen',
                feature4: 'Überwachen Sie Lebensmittelkosten und -verschwendung'
            },
            analytics: {
                title: 'Analysen & Berichte',
                subtitle: 'Gewinnen Sie Einblicke in Ihre Geschäftsleistung.',
                feature1: 'Verkaufsberichte und Umsatzverfolgung',
                feature2: 'Analyse beliebter Menüpunkte',
                feature3: 'Bestellverlauf der Kunden',
                feature4: 'Einblicke in die Geschäftsleistung'
            },
            paymentProcessing: {
                title: 'Zahlungsabwicklung',
                subtitle: 'Akzeptieren Sie alle Arten von Zahlungen von Ihren Kunden.',
                feature1: 'Kredit- und Debitkartenzahlungen',
                feature2: 'Digitale Geldbörsen (PayPal, Apple Pay usw.)',
                feature3: 'Option Nachnahme',
                feature4: 'Sichere Zahlungsabwicklung'
            },
            customerManagement: {
                title: 'Kundenverwaltung',
                subtitle: 'Bauen Sie Beziehungen zu Ihren Kunden auf.',
                feature1: 'Kundendatenbank und Profile',
                feature2: 'Bestellverlauf für jeden Kunden',
                feature3: 'Funktionen für Treueprogramme',
                feature4: 'Kundenfeedback und Bewertungen'
            },
            mobileApp: {
                title: 'Mobile App',
                subtitle: 'Verwalten Sie Ihr Restaurant von überall aus.',
                feature1: 'Mobile App für Restaurantbesitzer',
                feature2: 'Bestellungen unterwegs einsehen und verwalten',
                feature3: 'Menü und Einstellungen remote aktualisieren',
                feature4: 'Echtzeit-Benachrichtigungen'
            }
        },
        pricing: {
            title: 'Einfache, transparente Preisgestaltung',
            subtitle: 'Keine versteckten Gebühren, keine komplizierte Preisgestaltung. Wählen Sie den Plan, der für Ihr Restaurant funktioniert.',
            feature1: 'Starten Sie kostenlos mit grundlegenden Funktionen',
            feature2: 'Jederzeit upgraden, wenn Ihr Unternehmen wächst',
            feature3: 'Keine Einrichtungsgebühren oder langfristige Verträge',
            feature4: 'Jederzeit kündbar ohne Strafen',
            viewPricingPlans: 'Preispläne anzeigen'
        },
        cta: {
            title: 'Bereit, Ihr Restaurant zu transformieren?',
            subtitle: 'Schließen Sie sich Tausenden von Restaurants an, die bereits unsere Plattform nutzen, um ihren Umsatz zu steigern und mehr Kunden zu erreichen.',
            startFreeTrial: 'Kostenlose Testversion starten',
            contactSales: 'Vertrieb kontaktieren'
        }
    },
    pricing: {
        title: 'Einfache, transparente Preisgestaltung',
        subtitle: 'Keine versteckten Gebühren, keine komplizierten Preise. Wählen Sie den Plan, der zu Ihrem Restaurant passt.',
        getStarted: 'Jetzt starten',
        contactSales: 'Vertrieb kontaktieren',
        feature1: 'Kostenlos starten mit grundlegenden Funktionen',
        feature2: 'Jederzeit upgraden, wenn Ihr Unternehmen wächst',
        feature3: 'Keine Einrichtungsgebühren oder langfristigen Verträge',
        feature4: 'Jederzeit ohne Strafen kündigen',
        viewPricingPlans: 'Preise anzeigen',
        currency: 'USD',
        plans: {
            basic: {
                title: 'Basic',
                amount: '29',
                period: '/Monat',
                features: {
                    1: 'Ein einzelnes Restaurant',
                    2: 'Grundlegende Menüverwaltung',
                    3: 'Bestellabwicklung',
                    4: 'Einfache Tischreservierungen',
                    5: 'E-Mail-Support'
                }
            },
            professional: {
                title: 'Professional',
                amount: '79',
                period: '/Monat',
                features: {
                    1: 'Bis zu 3 Restaurants',
                    2: 'Erweiterte Menüverwaltung',
                    3: 'Analyse-Dashboard',
                    4: '24/7 Support'
                }
            },
            enterprise: {
                title: 'Enterprise',
                amount: '199',
                period: '/Monat',
                features: {
                    1: 'Unbegrenzte Anzahl von Restaurants',
                    2: 'Individuelle Funktionen',
                    3: 'Priorisierter Support',
                    4: 'White-Label-Optionen'
                }
            }
        },
        faq: {
            title: 'Häufig gestellte Fragen',
            questions: {
                1: {
                    question: 'Kann ich meinen Plan später upgraden?',
                    answer: 'Ja, Sie können Ihren Plan jederzeit upgraden oder downgraden. Änderungen werden im nächsten Abrechnungszyklus wirksam.'
                },
                2: {
                    question: 'Gibt es eine kostenlose Testversion?',
                    answer: 'Ja, alle Pläne beinhalten eine 14-tägige kostenlose Testphase. Keine Kreditkarte erforderlich.'
                }
            }
        }
    },

    // Auth
    auth: {
        login: {
            title: 'Bei Ihrem Konto anmelden',
            email: 'E-Mail-Adresse',
            password: 'Passwort',
            remember: 'Angemeldet bleiben',
            submit: 'Anmelden',
            forgot: 'Passwort vergessen?',
            noAccount: 'Noch kein Konto?',
            register: 'Jetzt registrieren'
        },
        otp: {
            title: 'OTP verifizieren',
            subtitle: 'Geben Sie den an Ihre E-Mail/Telefon gesendeten Code ein',
            placeholder: 'OTP eingeben',
            submit: 'OTP verifizieren',
            resend: 'OTP erneut senden',
            verificationSuccess: 'OTP verifiziert',
            verificationSuccessMessage: 'Sie sind jetzt angemeldet!',
            verificationFailed: 'Verifizierung fehlgeschlagen',
            verificationErrorMessage: 'OTP-Verifizierung fehlgeschlagen.',
            invalidOtp: 'Ungültiger OTP. Bitte versuchen Sie es erneut.',
            otpExpired: 'OTP ist abgelaufen. Bitte fordern Sie einen neuen an.',
            resendSuccess: 'OTP erfolgreich gesendet',
            resendErrorMessage: 'OTP konnte nicht erneut gesendet werden. Bitte versuchen Sie es erneut.'
        },
        forgot: {
            title: 'Passwort vergessen',
            subtitle: 'E-Mail eingeben, um Passwort zurückzusetzen',
            placeholder: 'E-Mail eingeben',
            submit: 'Passwort zurücksetzen',
            resend: 'OTP erneut senden',
            verificationSuccess: 'OTP verifiziert',
            verificationSuccessMessage: 'Sie sind jetzt angemeldet!',
            verificationFailed: 'Verifizierung fehlgeschlagen',
            verificationErrorMessage: 'OTP-Verifizierung fehlgeschlagen.',
            invalidOtp: 'Ungültiger OTP. Bitte versuchen Sie es erneut.',
            otpExpired: 'OTP ist abgelaufen. Bitte fordern Sie einen neuen an.',
            resendSuccess: 'OTP erfolgreich gesendet',
            resendErrorMessage: 'OTP konnte nicht erneut gesendet werden. Bitte versuchen Sie es erneut.',
            emailSentTitle: 'OTP gesendet',
            emailSentText: 'Wir haben einen OTP an Ihre E-Mail gesendet.',
            sendError: 'OTP konnte nicht gesendet werden. Bitte versuchen Sie es erneut.'
        },
        reset: {
            title: 'Passwort zurücksetzen',
            subtitle: 'Neues Passwort eingeben',
            placeholder: 'Neues Passwort eingeben',
            otp: 'OTP',
            password: 'Passwort',
            confirmPassword: 'Passwort bestätigen',
            submit: 'Passwort zurücksetzen',
            resend: 'OTP erneut senden',
            verificationSuccess: 'OTP verifiziert',
            verificationSuccessMessage: 'Sie sind jetzt angemeldet!',
            verificationFailed: 'Verifizierung fehlgeschlagen',
            verificationErrorMessage: 'OTP-Verifizierung fehlgeschlagen.',
            invalidOtp: 'Ungültiger OTP. Bitte versuchen Sie es erneut.',
            otpExpired: 'OTP ist abgelaufen. Bitte fordern Sie einen neuen an.',
            resendSuccess: 'OTP erfolgreich gesendet',
            resendErrorMessage: 'OTP konnte nicht erneut gesendet werden. Bitte versuchen Sie es erneut.'
        },
        register: {
            passwordPlaceholder :"Password",
            title: 'Ihr Restaurant registrieren',
            restaurantName: 'Restaurantname',
            domain: 'Domain-Name',
            email: 'E-Mail-Adresse',
            phone: 'Telefonnummer',
            password: 'Passwort',
            confirmPassword: 'Passwort bestätigen',
            address: 'Adresse',
            street: 'Straße',
            postalCode: 'Postleitzahl',
            city: 'Stadt',
            state: 'Bundesland',
            country: 'Land',
            county: 'Landkreis',
            submit: 'Registrieren',
            haveAccount: 'Bereits ein Konto?',
            login: 'Hier anmelden'
        },

        reset_password: {
            "title": "Passwort zurücksetzen",
            "choose_option": "Wählen Sie, wie Sie Ihr Passwort zurücksetzen möchten",
            "change_password": "Passwort ändern",
            "reset_via_email": "Zurücksetzung per E-Mail",
            "forgot_password_prompt": "Passwort vergessen?",
            // Change Password Tab
            "current_password": "Aktuelles Passwort",
            "current_password_placeholder": "Geben Sie Ihr aktuelles Passwort ein",
            "new_password": "Neues Passwort",
            "new_password_placeholder": "Geben Sie Ihr neues Passwort ein",
            "confirm_new_password": "Neues Passwort bestätigen",
            "confirm_new_password_placeholder": "Bestätigen Sie Ihr neues Passwort",
            "change_password_button": "Passwort ändern",
            "change_success_title": "Passwort geändert",
            "change_success_message": "Ihr Passwort wurde erfolgreich geändert.",
            "change_error_title": "Fehler beim Ändern des Passworts",
            "change_error_message": "Beim Ändern Ihres Passworts ist ein Fehler aufgetreten.",
            "invalid_current_password": "Ihr aktuelles Passwort ist falsch.",

            // Reset via Email Tab
            "email_address": "E-Mail-Adresse",
            "email_placeholder": "Geben Sie Ihre E-Mail-Adresse ein",
            "send_reset_link": "Reset-Link senden",
            "reset_instructions": "Wir senden einen Passwort-Reset-Link an Ihre E-Mail-Adresse.",
            "reset_link_sent_title": "Reset-Link gesendet",
            "reset_link_sent_message": "Überprüfen Sie Ihre E-Mail auf einen Passwort-Reset-Link.",
            "reset_error_title": "Fehler beim Senden des Reset-Links",
            "reset_error_message": "Beim Senden des Reset-Links ist ein Fehler aufgetreten.",
            "email_not_found": "Kein Konto mit dieser E-Mail-Adresse gefunden.",

            // Common
            "password_requirements": "Das Passwort muss mindestens 8 Zeichen lang sein.",
            "success_title": "Passwort erfolgreich zurückgesetzt",
            "success_message": "Ihr Passwort wurde erfolgreich zurückgesetzt. Sie können sich jetzt mit Ihrem neuen Passwort anmelden.",
            "back_to_login": "Zurück zur Anmeldung"
        },
    },
    "user_profile": {
        "title": "Profileinstellungen",
        "personal_info": "Persönliche Informationen",
        "name": "Name",
        "name_placeholder": "Geben Sie Ihren Namen ein",
        "email": "E-Mail-Adresse",
        "email_placeholder": "Geben Sie Ihre E-Mail-Adresse ein",
        "phone": "Telefonnummer",
        "phone_placeholder": "Geben Sie Ihre Telefonnummer ein",
        "address": "Adresse",
        "address_placeholder": "Geben Sie Ihre Adresse ein",
        "update_button": "Profil aktualisieren",
        "update_success": "Profil erfolgreich aktualisiert!",
        "update_error": "Profil konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.",
        "fetch_error": "Profildaten konnten nicht geladen werden.",

        "change_password": "Passwort ändern",
        "password_description": "Aktualisieren Sie Ihr Passwort, um Ihr Konto sicher zu halten",
        "change_password_button": "Passwort ändern",

        "account_status": "Kontostatus",
        "member_since": "Mitglied seit",
        "status": "Status",
        "active": "Aktiv"
    },
    "dashboard_common": {
        "loading": "Lädt..."
    },
    // Dashboard
    main_dashboard: {
        dashboard: 'Dashboard',
        stats: {
            totalTenants: 'Restaurants gesamt',
            activeTenants: 'Aktive Restaurants',
            pendingTenants: 'Ausstehende Genehmigungen',
            suspendedTenants: 'Gesperrte Restaurants',
            totalUsers: 'Benutzer gesamt',
            totalRoles: 'Rollen gesamt',
            totalPermissions: 'Berechtigungen gesamt',
            activeUsers: 'Aktive Benutzer heute'
        },
        quickActions: {
            title: 'Schnellaktionen',
            manageTenants: 'Restaurants verwalten',
            manageUsers: 'Benutzer verwalten',
            manageRoles: 'Rollen verwalten',
            clearCache: 'Cache löschen'
        }
    },
    dashboard: {
        recentTenants: 'Kürzliche Restaurants',
        systemStats: 'Systemstatistiken'
    },
    common: {
        viewAll: 'Alle anzeigen'
    },

    // Tenants
    tenants: {
        list: {
            title: 'Restaurants',
            name: 'Name',
            domain: 'Domain',
            owner: 'Besitzer',
            status: 'Status',
            actions: 'Aktionen'
        },
        status: {
            active: 'Aktiv',
            pending: 'Ausstehend',
            suspended: 'Gesperrt',
            trial: 'Testphase',
            inactive: 'Inaktiv'
        },
        filters: {
            searchPlaceholder: 'Restaurants suchen...',
            allStatus: 'Alle Status'
        },
        empty: {
            title: 'Keine Restaurants gefunden',
            filtered: 'Keine Restaurants entsprechen Ihren Suchkriterien. Versuchen Sie, Ihre Filter anzupassen.',
            noData: 'Es sind noch keine Restaurants registriert.'
        },
        actions: {
            view: 'Ansehen',
            edit: 'Bearbeiten',
            delete: 'Löschen',
            approve: 'Genehmigen',
            suspend: 'Sperren',
            activate: 'Aktivieren'
        }
    },

    // Common
    common: {
        save: 'Speichern',
        cancel: 'Abbrechen',
        close: 'Schließen',
        delete: 'Löschen',
        edit: 'Bearbeiten',
        error: 'Fehler',
        verifying: 'Wird überprüft...',
        create: 'Erstellen',
        description: 'Beschreibung',
        usersCount: 'Benutzeranzahl',
        search: 'Suchen',
        submit: 'Absenden',
        actions: 'Aktionen',
        confirm: 'Bestätigen',
        success: 'Erfolg',
        error: 'Fehler',
        loading: 'Lädt...',
        noData: 'Keine Daten verfügbar',
        update: 'Aktualisieren'
    },
    // Tenant contact/login helpers
    welcomeBack: 'Willkommen zurück!',
    contactSubtitle: "HABEN SIE EINE FRAGE? WIR GEBEN IHNEN EINE KLARE ANTWORT",
    getInTouch: 'Kontakt aufnehmen',
    nameTip: 'Geben Sie Ihren vollständigen Namen ein.',
    yourName: 'Ihr Name',
    emailTip: 'Geben Sie eine gültige E-Mail-Adresse ein.',
    yourEmail: 'sie@email.com',
    phoneTip: 'Geben Sie Ihre Telefonnummer ein.',
    yourPhoneNumber: 'Ihre Telefonnummer',
    subject: 'Betreff',
    subjectTip: 'Worum geht es in Ihrer Nachricht?',
    message: 'Nachricht',
    messageTip: 'Geben Sie hier Ihre Nachricht ein.',
    yourMessage: 'Ihre Nachricht...',
    // Users module generic labels
    name: 'Name',
    status: 'Status',
    created: 'Erstellt',
    createdAt: 'Erstellt am',
    deleted: 'Gelöscht',
    active: 'Aktiv',
    noRole: 'Keine Rolle',
    selectRole: 'Rolle auswählen',
    usersLeaveBlank: 'Leer lassen, um aktuelles Passwort beizubehalten',
    userDetails: 'Benutzerdetails',

    // Messages
    messages: {
        confirmDelete: 'Sind Sie sicher, dass Sie dieses Element löschen möchten?',
        deleteSuccess: 'Element erfolgreich gelöscht',
        savingChanges: 'Änderungen werden gespeichert...',
        changesSaved: 'Änderungen erfolgreich gespeichert',
        errorOccurred: 'Ein Fehler ist aufgetreten',
        sessionExpired: 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.',
        unauthorized: 'Sie sind nicht berechtigt, diese Aktion durchzuführen.'
    },

    // Roles
    roles_module: {
        title: 'Rollen & Berechtigungen',
        description: 'Systemrollen und ihre Berechtigungen verwalten',
        addNew: 'Neue Rolle hinzufügen',
        editRole: 'Rolle bearbeiten',
        addRole: 'Neue Rolle hinzufügen',
        noRolesFound: 'Keine Rollen gefunden',
        noPermissionsFound: 'Keine Berechtigungen gefunden',
        more: 'mehr',
        columns: {
            name: 'Rollenname',
            permissions: 'Berechtigungen',
            actions: 'Aktionen'
        },
        form: {
            name: 'Rollenname',
            permissions: 'Berechtigungen'
        },
        messages: {
            created: 'Rolle erfolgreich erstellt',
            updated: 'Rolle erfolgreich aktualisiert',
            deleted: 'Rolle erfolgreich gelöscht',
            saveFailed: 'Rolle konnte nicht gespeichert werden',
            deleteFailed: 'Rolle konnte nicht gelöscht werden',
            initFailed: 'Rollen konnten nicht initialisiert werden',
            confirmDelete: 'Löschen bestätigen',
            deleteWarning: 'Sind Sie sicher, dass Sie diese Rolle löschen möchten?'
        }
    },

    // Stock Check
    stock_check: {
        title: 'Lagerprüfanfrage(n)',
        description: 'Wir bieten kostenlose, sichere und sofort bestätigte Online-Lagerprüfungen.',
        reservation_title: 'Lagerbestand für ein Produkt prüfen.',
        full_name: 'Vollständiger Name*',
        full_name_tip: 'Geben Sie Ihren vollständigen Namen ein',
        phone_number: 'Telefonnummer*',
        phone_number_tip: 'Geben Sie Ihre Telefonnummer ein',
        email: 'E-Mail*',
        email_tip: 'Geben Sie Ihre E-Mail-Adresse ein',
        select_product: 'Produkt auswählen*',
        select_product_tip: 'Produkt zur Lagerprüfung auswählen',
        quantity: 'Menge*',
        quantity_tip: 'Geben Sie die zu prüfende Menge ein',
        processing: 'Wird verarbeitet...',
        check_stock: 'LAGER BESTÄTIGEN'
    },

    // Tenant Dashboard Components
    tenant_dashboard: {


        // Payment Gateways
        paymentGateway: {
            title: 'Zahlungsgateways',
            description: 'Konfigurieren Sie Ihre Zahlungsmethoden, um Zahlungen von Kunden zu akzeptieren.',
            statusTitle: "Verständnis des Gateway-Status",
            statuses: {
                inactive: "Inaktiv",
                inactiveDesc: "Es wird kein Zahlungs-Gateway verwendet. Das Gateway verarbeitet keine Zahlungen.",
                configured: "Konfiguriert",
                configuredDesc: "Das Gateway wurde mit API-Schlüsseln und Anmeldedaten eingerichtet, ist jedoch möglicherweise noch nicht aktiv.",
                active: "Aktiv",
                activeDesc: "Das Zahlungs-Gateway funktioniert im System und ist bereit, Zahlungen zu verarbeiten.",
                testConnection: "Verbindung testen",
                testConnectionDesc: "Überprüfen Sie, ob die eingegebenen API-Schlüssel korrekt und funktionsfähig sind. Dies stellt sicher, dass Ihr Zahlungs-Gateway ordnungsgemäß funktioniert."
            },
            badges: {
                default: "Standard",
                configured: "Konfiguriert",
                active: "Aktiv",
                inactive: "Inaktiv",
                notConfigured: "Nicht konfiguriert"
            },
            actions: {
                configure: "Konfigurieren",
                edit: "Bearbeiten",
                setDefault: "Als Standard setzen",
                activate: "Aktivieren",
                deactivate: "Deaktivieren"
            },
            modal: {
                configureTitle: "{name} konfigurieren",
                credentials: "Anmeldedaten",
                configuration: "Konfiguration",
                selectField: "{field} auswählen",
                show: "Anzeigen",
                hide: "Ausblenden",
                cancel: "Abbrechen",
                testConnection: "Verbindung testen",
                testing: "Wird getestet...",
                saving: "Wird gespeichert...",
                saveConfiguration: "Konfiguration speichern"
            },
            validation: {
                fieldRequired: "{field} ist erforderlich",
                validationError: "Validierungsfehler",
                fillRequiredFields: "Bitte füllen Sie alle erforderlichen Felder aus",
                checkHighlightedFields: "Bitte überprüfen Sie die hervorgehobenen Felder",
                fixFormErrors: "Bitte beheben Sie die Formularfehler"
            },
            errors: {
                error: "Fehler",
                failedToLoad: "Zahlungsgateways konnten nicht geladen werden",
                failedToLoadConfiguration: "Gateway-Konfiguration konnte nicht geladen werden",
                connectionTestFailed: "Verbindungstest fehlgeschlagen",
                connectionTestFailedTitle: "Verbindungstest fehlgeschlagen",
                connectionTestFailedNotActivated: "Verbindungstest fehlgeschlagen. Gateway gespeichert, aber nicht aktiviert. Bitte überprüfen Sie Ihre API-Schlüssel.",
                gatewaySavedNotActivated: "Gateway gespeichert, aber nicht aktiviert. Bitte überprüfen Sie, ob Ihre API-Schlüssel korrekt sind, und versuchen Sie erneut, die Verbindung zu testen.",
                testFailed: "Test fehlgeschlagen",
                failedToToggleGateway: "Gateway konnte nicht umgeschaltet werden",
                failedToSetDefault: "Standard-Gateway konnte nicht gesetzt werden"
            },
            messages: {
                success: "Erfolg!",
                connectionTestSuccessful: "Verbindungstest erfolgreich!",
                credentialsValid: "Ihre Anmeldedaten sind gültig und funktionieren korrekt.",
                configurationSavedActivated: "Konfiguration gespeichert & aktiviert!",
                gatewayConfiguredActive: "Gateway erfolgreich konfiguriert und Verbindungstest bestanden. Das Gateway ist jetzt aktiv.",
                gatewayStatusUpdated: "Gateway-Status aktualisiert",
                defaultGatewayUpdated: "Standard-Gateway aktualisiert"
            }
        },
        // Bulletin
        bulletin: {
            title: 'Pinnwand',
            discountNews: 'Rabattnachrichten',
            discount: 'Rabatt (in %)',
            discountTooltip: 'Geben Sie Ihren Rabattprozentsatz ein.',
            discountPlaceholder: 'Rabatt %',
            saveDiscount: 'Rabatt speichern',
            discountUpdated: 'Rabatt erfolgreich aktualisiert',
            failedToSave: 'Rabatt konnte nicht gespeichert werden'
        },

        // Categories
        categories: {
            title: 'Kategorien verwalten',
            deletedCategories: 'Gelöschte Kategorien',
            addCategory: 'Kategorie hinzufügen',
            editCategory: 'Kategorie bearbeiten',
            search: 'Suchen',
            searchPlaceholder: 'Nach Name oder Beschreibung suchen',
            status: 'Status',
            allStatus: 'Alle',
            active: 'Aktiv',
            inactive: 'Inaktiv',
            allCategories: 'Alle Kategorien',
            noCategoriesFound: 'Keine Kategorien gefunden',
            noCategoriesMessage: 'Keine Kategorien entsprechen Ihren Suchkriterien. Versuchen Sie, Ihre Filter anzupassen.',
            showingEntries: 'Zeige {from} bis {to} von {total} Einträgen',
            viewCategoryDetails: 'Kategoriendetails',
            deletedCategoriesTitle: 'Gelöschte Kategorien',
            noDeletedCategoriesFound: 'Keine gelöschten Kategorien gefunden.',
            categoryUpdated: 'Kategorie aktualisiert',
            categoryCreated: 'Kategorie erstellt',
            tableHeaders: {
                name: 'Name',
                description: 'Beschreibung',
                parent: 'Übergeordnet',
                status: 'Status',
                sortOrder: 'Sortierreihenfolge',
                createdAt: 'Erstellt am',
                deletedAt: 'Gelöscht am',
                action: 'Aktion',
                actions: 'Aktionen'
            },
            form: {
                namePlaceholder: 'Kategoriename',
                descriptionPlaceholder: 'Kategoriebeschreibung',
                imagePlaceholder: 'Bild-URL',
                activeLabel: 'Aktiv'
            },
            view: {
                name: 'Name',
                description: 'Beschreibung',
                parent: 'Übergeordnet',
                status: 'Status',
                sortOrder: 'Sortierreihenfolge',
                image: 'Bild',
                createdAt: 'Erstellt am',
                deletedAt: 'Gelöscht am',
                none: 'Keine'
            },
            modal: {
                cancel: 'Abbrechen',
                create: 'Erstellen',
                update: 'Aktualisieren',
                close: 'Schließen'
            },
            actions: {
                view: 'Ansehen',
                edit: 'Bearbeiten',
                delete: 'Löschen',
                restore: 'Wiederherstellen',
                hardDelete: 'Endgültig löschen'
            },
            statusBadges: {
                active: 'Aktiv',
                inactive: 'Inaktiv'
            },
            messages: {
                confirmDelete: 'Sind Sie sicher, dass Sie diese Kategorie löschen möchten?',
                confirmHardDelete: 'Sind Sie sicher, dass Sie diese Kategorie endgültig löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
                deleteSuccess: 'Kategorie erfolgreich gelöscht',
                restoreSuccess: 'Kategorie erfolgreich wiederhergestellt',
                hardDeleteSuccess: 'Kategorie endgültig gelöscht',
                updateSuccess: 'Kategorie erfolgreich aktualisiert',
                createSuccess: 'Kategorie erfolgreich erstellt',
                saveFailed: 'Kategorie konnte nicht gespeichert werden',
                deleteFailed: 'Kategorie konnte nicht gelöscht werden',
                hardDeleteFailed: 'Kategorie konnte nicht endgültig gelöscht werden',
                restoreFailed: 'Kategorie konnte nicht wiederhergestellt werden'
            },
            orderUpdated: 'Reihenfolge aktualisiert',
            orderUpdateFailed: 'Reihenfolge konnte nicht aktualisiert werden'
        },

        // CMS
        cms: {
            title: 'Content-Management-System',
            pages: 'Seiten',
            addPage: 'Seite hinzufügen',
            editPage: 'Seite bearbeiten',
            managePages: 'Seiten verwalten',
            deletedPages: 'Gelöschte Seiten',
            pageTitle: 'Seitentitel',
            pageContent: 'Seiteninhalt',
            pageSlug: 'Seiten-Slug',
            pageStatus: 'Seitenstatus',
            published: 'Veröffentlicht',
            draft: 'Entwurf',
            savePage: 'Seite speichern',
            pageSaved: 'Seite erfolgreich gespeichert',
            pageDeleted: 'Seite erfolgreich gelöscht',
            search: 'Suchen',
            searchPlaceholder: 'Nach Titel oder Schlüsselwort suchen',
            menu: 'Menü',
            allMenus: 'Alle Menüs',
            status: 'Status',
            all: 'Alle',
            active: 'Aktiv',
            inactive: 'Inaktiv',
            keyword: 'Schlüsselwort',
            order: 'Reihenfolge',
            createdAt: 'Erstellt am',
            actions: 'Aktionen',
            noPagesFound: 'Keine Seiten gefunden',
            noPagesMessage: 'Keine Seiten entsprechen Ihren Suchkriterien. Versuchen Sie, Ihre Filter anzupassen.',
            noContent: 'Kein Inhalt',
            noMenu: 'Kein Menü',
            showing: 'Zeige',
            to: 'bis',
            entries: 'Einträge',
            pageDetails: 'Seitendetails',
            title: 'Titel',
            content: 'Inhalt',
            deletedAt: 'Gelöscht am',
            action: 'Aktion',
            noDeletedPagesFound: 'Keine gelöschten Seiten gefunden.',
            restore: 'Wiederherstellen',
            cancel: 'Abbrechen',
            create: 'Erstellen',
            update: 'Aktualisieren',
            close: 'Schließen'
        },

        // Contact Requests
        contact_requests: {
            title: 'Kontaktanfragen',
            noRequests: 'Keine Kontaktanfragen',
            noRequestsMessage: 'Keine Kontaktanfragen gefunden.',
            search: 'Suchen',
            searchPlaceholder: 'Nach Name, E-Mail, Telefon, Betreff oder Nachricht suchen',
            columns: 'Spalten',
            selectAll: '(Alle auswählen)',
            ok: 'OK',
            cancel: 'Abbrechen',
            action: 'Aktion',
            copyEmail: 'E-Mail kopieren',
            copyPhone: 'Telefon kopieren',
            viewDetails: 'Details anzeigen',
            view: 'Ansehen',
            showing: 'Zeige',
            to: 'bis',
            of: 'von',
            entries: 'Einträge',
            detailsModalTitle: 'Kontaktanfrage-Details',
            close: 'Schließen',
            tableHeaders: {
                name: 'Name',
                email: 'E-Mail',
                phone: 'Telefon',
                subject: 'Betreff',
                message: 'Nachricht',
                date: 'Datum',
                status: 'Status',
                actions: 'Aktionen'
            },
            status: {
                new: 'Neu',
                read: 'Gelesen',
                replied: 'Beantwortet',
                closed: 'Geschlossen'
            },
            actions: {
                view: 'Ansehen',
                markAsRead: 'Als gelesen markieren',
                reply: 'Antworten',
                close: 'Schließen'
            }
        },

        // Customers
        customers: {
            title: 'Kunden',
            addCustomer: 'Kunden hinzufügen',
            editCustomer: 'Kunden bearbeiten',
            search: 'Kunden suchen',
            searchPlaceholder: 'Nach Name, E-Mail oder Telefon suchen',
            noCustomers: 'Keine Kunden gefunden',
            noCustomersMessage: 'Keine Kunden entsprechen Ihren Suchkriterien.',
            status: 'Status',
            all: 'Alle',
            active: 'Aktiv',
            inactive: 'Inaktiv',
            columns: 'Spalten',
            apply: 'Anwenden',
            showing: 'Zeige',
            to: 'bis',
            of: 'von',
            entries: 'Einträge',
            copyEmail: 'E-Mail kopieren',
            customerDetails: 'Kundendetails',
            id: 'ID',
            uniqueId: 'Eindeutige ID',
            name: 'Name',
            email: 'E-Mail',
            phone: 'Telefon',
            deviceInfo: 'Geräteinformationen',
            address: 'Adresse',
            createdAt: 'Erstellt am',
            createdBy: 'Erstellt von',
            updatedAt: 'Aktualisiert am',
            updatedBy: 'Aktualisiert von',
            noCustomerDetails: 'Keine Kundendetails verfügbar.',
            close: 'Schließen',
            tableHeaders: {
                name: 'Name',
                email: 'E-Mail',
                phone: 'Telefon',
                orders: 'Bestellungen',
                totalSpent: 'Gesamtausgaben',
                lastOrder: 'Letzte Bestellung',
                status: 'Status',
                actions: 'Aktionen'
            },
            customerForm: {
                name: 'Vollständiger Name',
                email: 'E-Mail-Adresse',
                phone: 'Telefonnummer',
                address: 'Adresse',
                save: 'Kunden speichern',
                update: 'Kunden aktualisieren'
            },
            messages: {
                customerCreated: 'Kunde erfolgreich erstellt',
                customerUpdated: 'Kunde erfolgreich aktualisiert',
                customerDeleted: 'Kunde erfolgreich gelöscht'
            }
        },

        // Email Settings
        email_settings: {
            title: 'E-Mail-Einstellungen',
            smtpSettings: 'SMTP-Einstellungen',
            businessEmailSettings: 'Geschäfts-E-Mail-Einstellungen',
            smtpHost: 'SMTP-Host',
            smtpPort: 'SMTP-Port',
            smtpUsername: 'SMTP-Benutzername',
            smtpPassword: 'SMTP-Passwort',
            smtpEncryption: 'Verschlüsselung',
            testEmail: 'Test-E-Mail',
            sendTestEmail: 'Test-E-Mail senden',
            saveSettings: 'Einstellungen speichern',
            settingsSaved: 'E-Mail-Einstellungen erfolgreich gespeichert',
            testEmailSent: 'Test-E-Mail erfolgreich gesendet',
            testEmailFailed: 'Test-E-Mail konnte nicht gesendet werden',
            mailDriver: 'Mail-Treiber',
            mailDriverTooltip: 'Normalerweise smtp. Fragen Sie Ihren E-Mail-Anbieter, wenn Sie unsicher sind.',
            mailDriverPlaceholder: 'z.B. smtp',
            mailHost: 'Mail-Host',
            mailHostTooltip: 'Die Mail-Server-Adresse, z.B. smtp.ihredomain.com',
            mailHostPlaceholder: 'z.B. apimstec.com',
            mailPort: 'Mail-Port',
            mailPortTooltip: 'Normalerweise 465 (SSL), 587 (TLS) oder 25. Fragen Sie Ihren Anbieter.',
            mailPortPlaceholder: 'z.B. 465',
            mailUsername: 'Mail-Benutzername',
            mailUsernameTooltip: 'Die E-Mail-Adresse oder der Benutzername für Ihr Mail-Konto.',
            mailUsernamePlaceholder: 'z.B. info@apimstec.com',
            mailPassword: 'Mail-Passwort',
            mailPasswordTooltip: 'Das Passwort für Ihr Mail-Konto. Halten Sie es sicher.',
            mailPasswordPlaceholder: 'Ihr Mail-Passwort',
            mailEncryption: 'Mail-Verschlüsselung',
            mailEncryptionTooltip: 'Normalerweise ssl oder tls. Fragen Sie Ihren Anbieter, wenn Sie unsicher sind.',
            mailEncryptionPlaceholder: 'z.B. ssl',
            mailFromName: 'Absender-Name',
            mailFromNameTooltip: 'Der Name, der als Absender in ausgehenden E-Mails erscheint.',
            mailFromNamePlaceholder: 'z.B. Ihr Restaurantname',
            businessEmail: 'Geschäfts-E-Mail',
            businessEmailTooltip: 'Die E-Mail-Adresse, die als Absender/Empfänger erscheint.',
            businessEmailPlaceholder: 'z.B. info@apimstec.com'
        },

        mail_logs: {
            title: 'E-Mail-Protokolle',
            search: 'Suchen',
            searchPlaceholder: 'E-Mail-Protokolle durchsuchen',
            columns: 'Spalten',
            actions: 'Aktionen',
            apply: 'Anwenden',
            view: 'Ansehen',
            details: 'Details',
            send_by: 'Gesendet von',
            sent_to: 'Gesendet an',
            type: 'Typ',
            content: 'Inhalt',
            close: 'Schließen',
            noData: 'Keine E-Mail-Datensätze gefunden!'
        },
        // Orders
        orders: {
            title: 'Bestellungen',
            search: 'Bestellungen suchen',
            searchPlaceholder: 'Nach Bestellnummer, Kundenname oder E-Mail suchen',
            columns: 'Spalten',
            apply: 'Anwenden',
            email: 'E-Mail',
            phone: 'Telefon',
            copyTrackingId: 'Tracking-ID kopieren',
            off: 'aus',
            viewDetails: 'Details anzeigen',
            showingEntries: 'Zeige {from} bis {to} von {total} Einträgen',
            orderDate: 'Bestelldatum',
            orderDetail: 'Bestelldetails',
            orderNumber: 'Bestellnummer',
            trackingId: 'Tracking-ID',
            customerName: 'Kundenname',
            customerEmail: 'Kunden-E-Mail',
            customerPhone: 'Kundentelefon',
            deliveryAddress: 'Lieferadresse',
            paymentStatus: 'Zahlungsstatus',
            createdAt: 'Erstellt am',
            changeStatus: 'Status ändern',
            status: 'Status',
            orderItems: 'Bestellpositionen',
            product: 'Produkt',
            quantity: 'Menge',
            unitPrice: 'Stückpreis',
            total: 'Gesamt',
            subtotal: 'Zwischensumme',
            discount: 'Rabatt',
            finalTotal: 'Endsumme',
            downloadInvoice: 'Rechnung',
            orderType: 'Bestelltyp',
            filters: {
                status: 'Status',
                dateRange: 'Zeitraum',
                allStatus: 'Alle Status'
            },
            noOrders: 'Keine Bestellungen gefunden',
            noOrdersMessage: 'Keine Bestellungen entsprechen Ihren Suchkriterien.',
            tableHeaders: {
                orderNumber: 'Bestellung #',
                customer: 'Kunde',
                items: 'Artikel',
                total: 'Gesamt',
                status: 'Status',
                date: 'Datum',
                actions: 'Aktionen'
            },
            orderDetails: {
                orderInfo: 'Bestellinformationen',
                customerInfo: 'Kundeninformation',
                items: 'Bestellpositionen',
                total: 'Gesamtbetrag',
                status: 'Bestellstatus'
            },
            actions: {
                view: 'Ansehen',
                confirm: 'Bestätigen',
                updateStatus: 'Status aktualisieren',
                cancel: 'Bestellung stornieren'
            }
        },
        // Products
        products: {
            title: 'Produkte',
            addProduct: 'Artikel hinzufügen',
            editProduct: 'Artikel bearbeiten',
            search: 'Menüartikel suchen',
            searchPlaceholder: 'Nach Name, Beschreibung oder Kategorie suchen',
            deletedProducts: 'Gelöschte Artikel',
            columns: 'Spalten',
            selectAll: '(Alle auswählen)',
            ok: 'OK',
            cancel: 'Abbrechen',
            none: 'Keine',
            showing: 'Zeige',
            to: 'bis',
            entries: 'Einträge',
            productDetails: 'Artikeldetails',
            productName: 'Produktname',
            selectCategory: 'Kategorie auswählen',
            addCategory: 'Kategorie hinzufügen',
            costPrice: 'Einkaufspreis',
            stockQuantity: 'Lagerbestand',
            minStockLevel: 'Mindestbestand',
            productDescription: 'Artikelbeschreibung',
            update: 'Aktualisieren',
            create: 'Erstellen',
            close: 'Schließen',
            noDeletedProducts: 'Keine gelöschten Produkte gefunden.',
            restore: 'Wiederherstellen',
            categoryName: 'Kategoriename',
            description: 'Beschreibung',
            add: 'Hinzufügen',
            productUpdated: 'Produkt aktualisiert',
            productCreated: 'Produkt erstellt',
            error: 'Fehler',
            failedToSaveProduct: 'Artikel konnte nicht gespeichert werden',
            areYouSure: 'Sind Sie sicher?',
            thisWillMoveProductToDeletedList: 'Dies verschiebt den Artikel in die gelöschte Liste.',
            yesDeleteIt: 'Ja, löschen!',
            thisWillPermanentlyDeleteProduct: 'Dies löscht den Artikel endgültig.',
            yesDeletePermanently: 'Ja, endgültig löschen!',
            orderUpdated: 'Reihenfolge aktualisiert',
            failedToUpdateOrder: 'Reihenfolge konnte nicht aktualisiert werden',
            categoryAdded: 'Kategorie hinzugefügt',
            failedToAddCategory: 'Kategorie konnte nicht hinzugefügt werden',
            filters: {
                category: 'Kategorie',
                status: 'Status',
                priceRange: 'Preisbereich',
                allCategories: 'Alle Kategorien',
                allStatus: 'Alle Status'
            },
            status: {
                active: 'Aktiv',
                inactive: 'Inaktiv',
                outOfStock: 'Nicht vorrätig'
            },
            noProducts: 'Keine Produkte gefunden',
            noProductsMessage: 'Keine Produkte entsprechen Ihren Suchkriterien.',
            tableHeaders: {
                image: 'Bild',
                name: 'Name',
                category: 'Kategorie',
                price: 'Preis',
                status: 'Status',
                stock: 'Lager',
                actions: 'Aktionen'
            },
            productForm: {
                name: 'Produktname',
                description: 'Beschreibung',
                category: 'Kategorie',
                price: 'Preis',
                stock: 'Lagerbestand',
                image: 'Produktbild',
                status: 'Status',
                save: 'Produkt speichern',
                update: 'Produkt aktualisieren'
            },
            messages: {
                productCreated: 'Produkt erfolgreich erstellt',
                productUpdated: 'Produkt erfolgreich aktualisiert',
                productDeleted: 'Produkt erfolgreich gelöscht',
                imageUploaded: 'Bild erfolgreich hochgeladen'
            }
        },

        common: {
            saving: 'Speichern...',
            creating: 'Erstellen...',
            updating: 'Aktualisieren...',
            deleting: 'Löschen...',
            restoring: 'Wiederherstellen...',
            adding: 'Hinzufügen...',
            loading: 'Lädt...'
        },

        products: {
            title: 'Menüpunkte verwalten',
            actions: {
                deletedItems: 'Gelöschte Menüpunkte',
                addItem: 'Menüpunkt hinzufügen',
                view: 'Ansehen',
                edit: 'Bearbeiten',
                delete: 'Löschen',
                restore: 'Wiederherstellen',
                hardDelete: 'Endgültig löschen',
                removeImage: 'Bild entfernen'
            },
            search: {
                label: 'Suchen',
                placeholder: 'Suche nach Name, Kategorie, SKU, etc.'
            },
            columns: {
                title: 'Spalten',
                selectAll: '(Alle auswählen)',
                name: 'Name',
                category: 'Kategorie',
                price: 'Preis',
                cost_price: 'Kosten',
                stock_quantity: 'Lager',
                min_stock_level: 'Mindestbestand',
                status: 'Status',
                is_active: 'Aktiv',
                is_featured: 'Empfohlen',
                sku: 'SKU',
                barcode: 'Barcode',
                sort_order: 'Sortierreihenfolge',
                created_at: 'Erstellt am',
                actions: 'Aktionen'
            },
            empty: {
                title: 'Keine Menüpunkte gefunden',
                message: 'Keine Menüpunkte entsprechen Ihren Suchkriterien. Versuchen Sie, Ihre Filter anzupassen.',
                deleted: 'Keine gelöschten Menüpunkte gefunden.'
            },
            status: {
                active: 'Aktiv',
                inactive: 'Inaktiv'
            },
            common: {
                none: 'Keine',
                createdAt: 'Erstellt am',
                deletedAt: 'Gelöscht am'
            },
            modal: {
                createTitle: 'Menüpunkt hinzufügen',
                editTitle: 'Menüpunkt bearbeiten',
                viewTitle: 'Menüpunkt Details',
                deletedTitle: 'Gelöschte Menüpunkte',
                quickCategoryTitle: 'Kategorie hinzufügen'
            },
            form: {
                name: {
                    label: 'Name',
                    placeholder: 'Menüpunkt Name'
                },
                description: {
                    label: 'Beschreibung',
                    placeholder: 'Menüpunkt Beschreibung'
                },
                category: {
                    label: 'Kategorie',
                    placeholder: 'Kategorie auswählen',
                    addTitle: 'Kategorie hinzufügen',
                    name: 'Kategorie Name',
                    description: 'Beschreibung'
                },
                price: {
                    label: 'Preis',
                    placeholder: 'Preis'
                },
                cost_price: {
                    label: 'Einkaufspreis',
                    placeholder: 'Einkaufspreis'
                },
                stock_quantity: {
                    label: 'Lagerbestand',
                    placeholder: 'Lagerbestand'
                },
                min_stock_level: {
                    label: 'Mindestbestand',
                    placeholder: 'Mindestbestand'
                },
                status: {
                    label: 'Status'
                },
                is_active: {
                    label: 'Aktiv'
                },
                is_featured: {
                    label: 'Empfohlen'
                },
                sku: {
                    label: 'SKU',
                    placeholder: 'SKU'
                },
                barcode: {
                    label: 'Barcode',
                    placeholder: 'Barcode'
                },
                sort_order: {
                    label: 'Sortierreihenfolge'
                },
                images: {
                    label: 'Bilder'
                }
            },
            pagination: {
                showing: 'Zeige {from} bis {to} von {total} Einträgen'
            },
            confirm: {
                delete: {
                    title: 'Sind Sie sicher?',
                    message: 'Dies verschiebt den Menüpunkt in die gelöschte Liste.',
                    confirm: 'Ja, löschen!'
                },
                hardDelete: {
                    title: 'Sind Sie sicher?',
                    message: 'Dies wird den Menüpunkt endgültig löschen.',
                    confirm: 'Ja, endgültig löschen!'
                }
            },
            alerts: {
                created: 'Menüpunkt erstellt',
                updated: 'Menüpunkt aktualisiert',
                deleted: 'Menüpunkt gelöscht',
                hardDeleted: 'Menüpunkt endgültig gelöscht',
                restored: 'Menüpunkt wiederhergestellt',
                saveFailed: 'Menüpunkt konnte nicht gespeichert werden',
                deleteFailed: 'Menüpunkt konnte nicht gelöscht werden',
                hardDeleteFailed: 'Menüpunkt konnte nicht endgültig gelöscht werden',
                restoreFailed: 'Menüpunkt konnte nicht wiederhergestellt werden',
                orderUpdated: 'Reihenfolge aktualisiert',
                orderUpdateFailed: 'Reihenfolge konnte nicht aktualisiert werden',
                categoryAdded: 'Kategorie hinzugefügt',
                categoryAddFailed: 'Kategorie konnte nicht hinzugefügt werden'
            }
        },
        // Quote Requests
        quote_requests: {
            title: 'Angebotsanfragen',
            noRequests: 'Keine Angebotsanfragen',
            noRequestsMessage: 'Keine Angebotsanfragen gefunden.',
            tableHeaders: {
                customer: 'Kunde',
                product: 'Produkt',
                quantity: 'Menge',
                message: 'Nachricht',
                date: 'Datum',
                status: 'Status',
                actions: 'Aktionen'
            },
            status: {
                new: 'Neu',
                quoted: 'Angeboten',
                accepted: 'Akzeptiert',
                rejected: 'Abgelehnt'
            },
            actions: {
                view: 'Ansehen',
                provideQuote: 'Angebot erstellen',
                accept: 'Akzeptieren',
                reject: 'Ablehnen'
            }
        },

        reservations: {
            title: 'Reservierungsliste',
            search: 'Suchen',
            searchPlaceholder: 'Suche nach Name, E-Mail, Telefon, Datum oder Nachricht',
            columns: 'Spalten',
            selectAll: '(Alle auswählen)',
            ok: 'OK',
            cancel: 'Abbrechen',
            action: 'Aktion',
            viewDetails: 'Details anzeigen',
            showing: 'Zeige',
            to: 'bis',
            of: 'von',
            entries: 'Einträgen',
            noReservations: 'Keine Reservierungen gefunden',
            noReservationsMessage: 'Keine Reservierungen entsprechen Ihren Suchkriterien. Versuchen Sie, Ihre Filter anzupassen.',
            detailsTitle: 'Reservierungsdetails',
            close: 'Schließen',
            name: 'Name',
            phone: 'Telefon',
            guests: 'Gäste',
            email: 'E-Mail',
            date: 'Datum',
            time: 'Uhrzeit',
            message: 'Nachricht',
            createdAt: 'Erstellt am',
            failedToFetch: 'Reservierungen konnten nicht geladen werden.',

            // New fields for table assignment and status management
            status: 'Status',
            tableNo: 'Tischnummer',
            assignedAt: 'Zugewiesen am',
            edit: 'Bearbeiten',
            assignTable: 'Tisch zuweisen',
            delete: 'Löschen',
            editReservation: 'Reservierung bearbeiten',
            update: 'Aktualisieren',
            assign: 'Zuweisen',
            tableNoPlaceholder: 'Tischnummer eingeben',
            tableRequiredWarning: 'Tischnummer ist erforderlich, wenn der Status auf "Zugewiesen" gesetzt ist',
            tableNoRequired: 'Bitte geben Sie eine Tischnummer ein',
            assignTableHelp: 'Das Zuweisen eines Tisches setzt den Status automatisch auf "Zugewiesen"',

            // Status options
            allStatus: 'Alle Status',
            pending: 'Ausstehend',
            confirmed: 'Bestätigt',
            assigned: 'Zugewiesen',
            seated: 'Platziert',
            completed: 'Abgeschlossen',
            cancelled: 'Storniert',
            noShow: 'Nicht erschienen',
            notAssigned: 'Nicht zugewiesen',

            // Success/Error messages
            success: 'Erfolg',
            error: 'Fehler',
            warning: 'Warnung',
            confirmDelete: 'Löschen bestätigen',
            deleteWarning: 'Sind Sie sicher, dass Sie diese Reservierung löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
            deleted: 'Gelöscht',
            updateFailed: 'Reservierung konnte nicht aktualisiert werden',
            assignFailed: 'Tisch konnte nicht zugewiesen werden',
            deleteFailed: 'Reservierung konnte nicht gelöscht werden'
        },

        // Stock Check Requests
        stock_check_requests: {
            title: 'Lagerprüfanfragen',
            noRequests: 'Keine Lagerprüfanfragen gefunden',
            tableHeaders: {
                name: 'Name',
                email: 'E-Mail',
                phone: 'Telefon',
                product: 'Produkt',
                quantity: 'Menge',
                createdAt: 'Erstellt am'
            }
        },

        // Subscribers
        subscribers: {
            title: 'Abonnentenliste',
            search: 'Suchen',
            searchPlaceholder: 'Nach E-Mail suchen',
            noSubscribers: 'Keine Abonnenten gefunden',
            noSubscribersMessage: 'Keine Abonnenten entsprechen Ihren Suchkriterien. Versuchen Sie, Ihre Filter anzupassen.',
            tableHeaders: {
                email: 'E-Mail',
                createdAt: 'Erstellt am'
            },
            copyEmail: 'E-Mail kopieren',
            showing: 'Zeige',
            to: 'bis',
            of: 'von',
            entries: 'Einträge'
        },

        // Users
        users: {
            title: 'Benutzer verwalten',
            addUser: 'Benutzer hinzufügen',
            editUser: 'Benutzer bearbeiten',
            search: 'Suchen',
            searchPlaceholder: 'Nach Name oder E-Mail suchen',
            role: 'Rolle',
            allRoles: 'Alle Rollen',
            status: 'Status',
            all: 'Alle',
            statusActive: 'Aktiv',
            statusDeleted: 'Gelöscht',
            noRole: 'Keine Rolle',
            created: 'Erstellt',
            tableHeaders: {
                name: 'Name',
                email: 'E-Mail',
                role: 'Rolle',
                status: 'Status',
                createdAt: 'Erstellt am',
                actions: 'Aktionen'
            },
            leaveBlankToKeepPassword: 'Leer lassen, um aktuelles Passwort beizubehalten',
            passwordMin8: 'Passwort (min. 8 Zeichen)',
            selectRole: 'Rolle auswählen',
            cancel: 'Abbrechen',
            update: 'Aktualisieren',
            create: 'Erstellen',
            userDetails: 'Benutzerdetails',
            name: 'Name',
            email: 'E-Mail',
            createdAt: 'Erstellt am',
            deletedAt: 'Gelöscht am',
            close: 'Schließen',
            userUpdated: 'Benutzer aktualisiert',
            userCreated: 'Benutzer erstellt',
            error: 'Fehler',
            failedToSaveUser: 'Benutzer konnte nicht gespeichert werden',
            areYouSure: 'Sind Sie sicher?',
            softDeleteWarning: 'Dies löscht den Benutzer vorläufig. Er kann sich nicht mehr anmelden, aber seine Daten bleiben erhalten.',
            yesDeleteIt: 'Ja, löschen!',
            userDeleted: 'Benutzer gelöscht',
            failedToDeleteUser: 'Benutzer konnte nicht gelöscht werden',
            areYouAbsolutelySure: 'Sind Sie absolut sicher?',
            hardDeleteWarning: 'Dies löscht den Benutzer endgültig. Diese Aktion kann nicht rückgängig gemacht werden!',
            yesPermanentlyDelete: 'Ja, endgültig löschen!',
            userPermanentlyDeleted: 'Benutzer endgültig gelöscht',
            failedToPermanentlyDeleteUser: 'Benutzer konnte nicht endgültig gelöscht werden',
            userRestored: 'Benutzer wiederhergestellt',
            failedToRestoreUser: 'Benutzer konnte nicht wiederhergestellt werden',
            locationStatus: 'Standortstatus'
        },

        // Roles
        roles: {
            title: 'Rollen & Berechtigungen',
            description: 'Systemrollen und ihre Berechtigungen verwalten',
            addNew: 'Neue Rolle hinzufügen',
            editRole: 'Rolle bearbeiten',
            addNewRole: 'Neue Rolle hinzufügen',
            noRolesFound: 'Keine Rollen gefunden',
            noRolesMessage: 'Es sind noch keine Rollen registriert.',
            addFirstRole: 'Erste Rolle hinzufügen',
            users: 'Benutzer',
            permissions: 'Berechtigungen',
            more: 'mehr',
            cancel: 'Abbrechen',
            update: 'Aktualisieren',
            create: 'Erstellen',
            noPermissionsFound: 'Keine Berechtigungen gefunden',
            tableHeaders: {
                name: 'Rollenname',
                description: 'Beschreibung',
                users: 'Benutzeranzahl',
                permissions: 'Berechtigungen',
                actions: 'Aktionen'
            },
            form: {
                namePlaceholder: 'Rollenname*',
                nameTooltip: 'Geben Sie einen beschreibenden Namen für diese Rolle ein (z.B. Manager, Kellner)',
                descriptionPlaceholder: 'Beschreibung (optional)',
                descriptionTooltip: 'Beschreiben Sie die Verantwortlichkeiten oder den Umfang dieser Rolle (optional)',
                permissions: 'Berechtigungen',
                permissionsTooltip: 'Wählen Sie die Berechtigungen aus, die diese Rolle haben soll',
                selectAll: 'Alle auswählen',
                selectAllTooltip: 'Alle Berechtigungen auswählen oder abwählen'
            },
            messages: {
                roleCreated: 'Rolle erfolgreich erstellt',
                roleUpdated: 'Rolle erfolgreich aktualisiert',
                roleDeleted: 'Rolle erfolgreich gelöscht',
                confirmDelete: 'Sind Sie sicher, dass Sie diese Rolle löschen möchten?',
                deleteWarning: "Sie können dies nicht rückgängig machen!",
                loadPermissionsFailed: 'Berechtigungen konnten nicht geladen werden',
                saveFailed: 'Rolle konnte nicht gespeichert werden',
                deleteFailed: 'Rolle konnte nicht gelöscht werden'
            }
        },

        // Settings
        settings: {
            title: 'Einstellungen',
            generalSettings: 'Allgemeine Einstellungen',
            restaurantInfo: 'Restaurantinformationen',
            restaurantName: 'Restaurantname',
            description: 'Beschreibung',
            address: 'Adresse',
            phone: 'Telefon',
            publicphone: 'Restaurant-Telefon',
            email: 'E-Mail',
            publicemail: 'Restaurant-E-Mail',
            website: 'Website',
            openingHours: 'Öffnungszeiten',
            currency: 'Währung',
            logo: 'Logo',
            uploadLogo: 'Logo hochladen',
            logoRequirements: 'Logo muss kleiner als 2MB und im Bildformat sein',
            saveSettings: 'Einstellungen speichern',
            settingsSaved: 'Einstellungen erfolgreich gespeichert',
            logoUploaded: 'Logo erfolgreich hochgeladen',
            basicInformation: 'Grundinformationen',
            businessName: 'Firmenname',
            businessNameTooltip: 'Geben Sie den Geschäftsnamen Ihres Restaurants ein.',
            logoTooltip: 'Laden Sie das Logo Ihres Restaurants hoch. Empfohlene Größe: 200x200px. Max. Größe: 2MB.',
            logoRequirements: 'Empfohlene Größe: 200x200px. Max. Größe: 2MB',
            emailTooltip: 'Die Haupt-E-Mail-Adresse Ihres Restaurants. Wird für Benachrichtigungen und Kontakt verwendet.',
            phoneTooltip: 'Die Haupttelefonnummer Ihres Restaurants.',
            locationInformation: 'Standortinformationen',
            addressTooltip: 'Vollständige Adresse Ihres Restaurants.',
            city: 'Stadt',
            cityTooltip: 'Stadt, in der sich Ihr Restaurant befindet.',
            state: 'Bundesland',
            stateTooltip: 'Bundesland oder Provinz Ihres Restaurants.',
            postalCode: 'Postleitzahl',
            postalCodeTooltip: 'Postleitzahl für die Adresse Ihres Restaurants.',
            country: 'Land',
            countryTooltip: 'Land, in dem sich Ihr Restaurant befindet.',
            placeId: 'Place ID',
            placeIdTooltip: 'Google Maps Place ID (optional, für erweiterte Integrationen).',
            pickupTimeRange: 'Abholzeitraum',
            pickupTimeRangeTooltip: 'Zeitraum für Bestellabholungen (z.B. 9:00 - 22:00).',
            latitude: 'Breitengrad',
            latitudeTooltip: 'Breitengrad-Koordinate für Ihr Restaurant (optional).',
            longitude: 'Längengrad',
            longitudeTooltip: 'Längengrad-Koordinate für Ihr Restaurant (optional).',
            systemSettings: 'Systemeinstellungen',
            currencyTooltip: 'Wählen Sie die Währung für die Transaktionen Ihres Restaurants.',
            timezone: 'Zeitzone',
            timezoneTooltip: 'Wählen Sie die Zeitzone Ihres Restaurants.',
            timezoneUTC: 'UTC',
            timezoneEastern: 'Eastern Time',
            timezoneCentral: 'Central Time',
            timezoneMountain: 'Mountain Time',
            timezonePacific: 'Pacific Time',
            dateFormat: 'Datumsformat',
            dateFormatTooltip: 'Wählen Sie, wie Daten in Ihrem System angezeigt werden.',
            dateFormatYMD: 'JJJJ-MM-TT',
            dateFormatMDY: 'MM/TT/JJJJ',
            dateFormatDMY: 'TT/MM/JJJJ',
            timeFormat: 'Zeitformat',
            timeFormatTooltip: 'Wählen Sie, wie Zeiten in Ihrem System angezeigt werden.',
            timeFormat24: '24-Stunden (HH:mm:ss)',
            timeFormat12: '12-Stunden (hh:mm:ss AM/PM)',
            status: 'Status',
            statusTooltip: 'Umschalten, um Ihr Restaurant im System zu aktivieren oder zu deaktivieren.',
            statusActive: 'Aktiv',
            statusInactive: 'Inaktiv',
            socialMediaLinks: 'Social-Media-Links',
            facebookLink: 'Facebook-Link',
            facebookLinkTooltip: 'URL der Facebook-Seite Ihres Restaurants.',
            twitterLink: 'Twitter-Link',
            twitterLinkTooltip: 'URL des Twitter-Profils Ihres Restaurants.',
            linkedinLink: 'LinkedIn-Link',
            linkedinLinkTooltip: 'URL der LinkedIn-Seite Ihres Restaurants.',
            googlePlusLink: 'Google Plus-Link',
            googlePlusLinkTooltip: 'URL der Google Plus-Seite Ihres Restaurants (falls vorhanden).',
            instagramLink: 'Instagram-Link',
            instagramLinkTooltip: 'URL des Instagram-Profils Ihres Restaurants.',
            descriptionLabel: 'Beschreibung',
            descriptionTooltip: 'Eine kurze Beschreibung Ihres Restaurants, der Küche oder Spezialitäten.',
            deliveryRange: 'Lieferbereich',
            deliveryRangeNortheast: 'Nordöstliche Ecke',
            deliveryRangeNortheastTooltip: 'Klicken Sie auf die Karte, um die nordöstliche Ecke Ihres Liefergebiets festzulegen',
            deliveryRangeSouthwest: 'Südwestliche Ecke',
            deliveryRangeSouthwestTooltip: 'Klicken Sie auf die Karte, um die südwestliche Ecke Ihres Liefergebiets festzulegen',
        }
    },

    common: {
        loading: 'Lädt...',
        error: 'Fehler',
        cancel: 'Abbrechen',
        ok: 'OK',
        close: 'Schließen',
        yes: 'Ja',
        no: 'Nein',
        create: 'Erstellen',
        update: 'Aktualisieren',
        add: 'Hinzufügen'
    },
    // Common dashboard elements
    dashboard_common: {
        loading: 'Lädt...',
        noData: 'Keine Daten verfügbar',
        search: 'Suchen',
        filter: 'Filter',
        actions: 'Aktionen',
        save: 'Speichern',
        cancel: 'Abbrechen',
        delete: 'Löschen',
        edit: 'Bearbeiten',
        view: 'Ansehen',
        create: 'Erstellen',
        close: 'Close',
        update: 'Aktualisieren',
        confirm: 'Bestätigen',
        success: 'Erfolg',
        error: 'Fehler',
        warning: 'Warnung',
        info: 'Information',
        yes: 'Ja',
        no: 'Nein',
        close: 'Schließen',
        back: 'Zurück',
        next: 'Weiter',
        previous: 'Zurück',
        submit: 'Absenden',
        reset: 'Zurücksetzen',
        apply: 'Anwenden',
        clear: 'Löschen',
        select: 'Auswählen',
        choose: 'Auswählen',
        upload: 'Hochladen',
        download: 'Herunterladen',
        export: 'Exportieren',
        import: 'Importieren',
        refresh: 'Aktualisieren',
        reload: 'Neu laden',
        add: 'Hinzufügen',
        remove: 'Entfernen',
        duplicate: 'Duplizieren',
        copy: 'Kopieren',
        paste: 'Einfügen',
        cut: 'Ausschneiden',
        undo: 'Rückgängig',
        redo: 'Wiederholen',
        print: 'Drucken',
        share: 'Teilen',
        settings: 'Einstellungen',
        preferences: 'Einstellungen',
        profile: 'Profil',
        logout: 'Abmelden',
        login: 'Anmelden',
        register: 'Registrieren',
        forgotPassword: 'Passwort vergessen',
        resetPassword: 'Passwort zurücksetzen',
        changePassword: 'Passwort ändern',
        updateProfile: 'Profil aktualisieren',
        notifications: 'Benachrichtigungen',
        messages: 'Nachrichten',
        inbox: 'Posteingang',
        sent: 'Gesendet',
        drafts: 'Entwürfe',
        trash: 'Papierkorb',
        archive: 'Archiv',
        markAsRead: 'Als gelesen markieren',
        markAsUnread: 'Als ungelesen markieren',
        reply: 'Antworten',
        forward: 'Weiterleiten',
        compose: 'Verfassen',
        send: 'Senden',
        saveAsDraft: 'Als Entwurf speichern',
        discard: 'Verwerfen',
        publish: 'Veröffentlichen',
        unpublish: 'Veröffentlichung aufheben',
        approve: 'Genehmigen',
        reject: 'Ablehnen',
        activate: 'Aktivieren',
        deactivate: 'Deaktivieren',
        enable: 'Aktivieren',
        disable: 'Deaktivieren',
        show: 'Anzeigen',
        hide: 'Ausblenden',
        expand: 'Erweitern',
        collapse: 'Zuklappen',
        maximize: 'Maximieren',
        minimize: 'Minimieren',
        fullscreen: 'Vollbild',
        exitFullscreen: 'Vollbild beenden',
        zoomIn: 'Vergrößern',
        zoomOut: 'Verkleinern',
        fitToScreen: 'An Bildschirm anpassen',
        actualSize: 'Tatsächliche Größe',
        rotate: 'Drehen',
        flip: 'Spiegeln',
        crop: 'Zuschneiden',
        resize: 'Größe ändern',
        move: 'Verschieben',
        align: 'Ausrichten',
        distribute: 'Verteilen',
        group: 'Gruppieren',
        ungroup: 'Gruppierung aufheben',
        lock: 'Sperren',
        unlock: 'Entsperren',
        protect: 'Schützen',
        unprotect: 'Schutz aufheben',
        invite: 'Einladen',
        block: 'Blockieren',
        unblock: 'Blockierung aufheben',
        follow: 'Folgen',
        unfollow: 'Nicht mehr folgen',
        subscribe: 'Abonnieren',
        unsubscribe: 'Abbestellen',
        like: 'Gefällt mir',
        unlike: 'Gefällt mir nicht',
        favorite: 'Favorisieren',
        unfavorite: 'Favorit entfernen',
        bookmark: 'Lesezeichen',
        unbookmark: 'Lesezeichen entfernen',
        rate: 'Bewerten',
        review: 'Rezension',
        comment: 'Kommentar',
        report: 'Melden',
        flag: 'Markieren',
        spam: 'Spam',
        restore: 'Wiederherstellen',
        rename: 'Umbenennen',
        sort: 'Sortieren',
        find: 'Finden',
        replace: 'Ersetzen',
        selectAll: 'Alle auswählen',
        deselectAll: 'Alle abwählen',
        invertSelection: 'Auswahl umkehren',
        clearSelection: 'Auswahl löschen',
        selectNone: 'Keine auswählen'
    },


    // Checkout Page
    checkout: {
        deliveryAddress: 'Lieferadresse',
        firstName: 'Vorname*',
        lastName: 'Nachname*',
        email: 'E-Mail*',
        phone: 'Telefon*',
        address: 'Adresse*',
        next: 'Weiter',
        deliveryMethod: 'Liefermethode',
        freeDelivery: 'Kostenlose Lieferung',
        freeDeliveryDesc: '0,00 € / Lieferung in 7 bis 14 Werktagen',
        back: 'Zurück',
        orderReview: 'Bestellübersicht',
        deliveryAddressLabel: 'Lieferadresse:',
        deliveryMethodLabel: 'Liefermethode:',
        shoppingCart: 'Warenkorb:',
        name: 'Name',
        unitPrice: 'Stückpreis',
        quantity: 'Menge',
        total: 'Gesamt',
        subtotal: 'Zwischensumme:',
        discount: 'Rabatt:',
        grandTotal: 'Endsumme:',
        placeOrderNow: 'Jetzt bestellen',
        thankYou: 'Vielen Dank!',
        orderProcessed: 'Ihre Bestellung wurde bearbeitet.',
        returnToShop: 'Zurück zum Shop',
        orderSummary: 'Bestellzusammenfassung',
        yourCartEmpty: 'Ihr Warenkorb ist derzeit leer!',
        orderFailed: 'Bestellung fehlgeschlagen',
        orderNotSaved: 'Ihre Bestellung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.',
        rateExperience: 'Bitte bewerten Sie Ihre Erfahrung.',
        submit: 'Absenden',
        deliveryOutOfRange: 'Entschuldigung, wir liefern nicht an diesen Ort. Bitte überprüfen Sie unseren Lieferbereich oder wählen Sie eine andere Adresse.',
        addressNotInDeliveryArea: 'Diese Adresse liegt außerhalb unseres Lieferbereichs. Bitte wählen Sie eine Adresse innerhalb unseres Liefergebiets.'
    },

    check_out: {
        form: {
            deliveryAddress: 'Lieferadresse',
            l_name: 'Nachname',
            f_name: 'Vorname *',
            email: 'E-Mail *',
            phone: 'Telefon *',
            address: 'Adresse *',
            city: 'Stadt *',
            state: 'Bundesland/Provinz *',
            postal: 'Postleitzahl *',
            country: 'Land *',
            specialInstructions: 'Besondere Anweisungen (Optional)',
            specialInstructionsPlaceholder: 'z.B. An der Tür abstellen, vor der Lieferung anrufen, etc.'
        },
        in_house: {
            name: 'Name',
            phone: 'Telefon *',
            email: 'E-Mail *',
            tableNo: 'Tischnummer (Optional)',
            tableNoPlaceholder: 'z.B. Tisch 5',
            pickUpTime: 'Abholzeit (Optional)',
            specialInstructions: 'Besondere Anweisungen (Optional)',
            specialInstructionsPlaceholder: 'Besondere Wünsche oder Notizen...',
            next: 'Weiter',
            back: 'Zurück'
        },
        orderTypes: {
            onlineDelivery: 'Online-Lieferung',
            inHouse: 'Im Haus',
            inHouseOrder: 'Bestellung im Haus',
            takeaway: 'Mitnahme',
            takeawayOrder: 'Mitnahme-Bestellung'
        },
        steps: {
            customerDetails: 'Kundendaten',
            payment: 'Zahlung',
            orderReview: 'Bestellübersicht'
        },
        delivery_method: {
            deliveryMethod: 'Liefermethode',
            freeDelivery: 'Kostenlose Lieferung (30-45 Minuten)',
            deliveryTime: 'Lieferung in 30-45 Minuten',
            free: 'KOSTENLOS',
            expressDelivery: 'Express-Lieferung (15-25 Minuten) - +{symbol}2,99',
            deliveryText: 'Bezahlen Sie bei Erhalt der Bestellung'
        },
        payment: {
            secureOnlinePayment: 'Sichere Online-Zahlung',
            testMode: '• Testmodus',
            default: 'Standard',
            testCards: 'Testkarten',
            visaSuccess: 'Visa - Erfolgreich',
            visaDeclined: 'Visa - Abgelehnt',
            securePayment: 'Sichere {method} Zahlung',
            paymentInformation: 'Zahlungsinformationen',
            paymentInHouse: 'Die Zahlung wird nach dem Essen an Ihrem Tisch entgegengenommen.',
            paymentTakeaway: 'Die Zahlung wird bei der Abholung Ihrer Bestellung entgegengenommen.',
            cashOnDelivery: 'Barzahlung bei Lieferung',
            stripeCheckout: 'Kredit-/Debitkarte (Stripe Checkout)',
            onlinePayment: 'Online-Zahlung'
        },
        buttons: {
            back: 'Zurück',
            next: 'Weiter',
            edit: 'Bearbeiten',
            editCart: 'Warenkorb bearbeiten',
            redirecting: 'Weiterleitung...',
            payWithStripe: 'Mit Stripe bezahlen',
            processing: 'Wird verarbeitet...',
            placeOrderNow: 'Jetzt bestellen',
            confirmOrder: 'Bestellung bestätigen',
            continueShopping: 'Weiter einkaufen',
            proceedToPayment: 'Zur Zahlung fortfahren'
        },
        review: {
            orderReview: 'Bestellübersicht',
            orderType: 'Bestelltyp',
            deliveryAddress: 'Lieferadresse:',
            customerDetails: 'Kundendaten:',
            specialInstructions: 'Besondere Anweisungen',
            table: 'Tisch',
            pickupTime: 'Abholzeit',
            paymentMethod: 'Zahlungsmethode',
            shoppingCart: 'Warenkorb',
            subtotal: 'Zwischensumme',
            deliveryFee: 'Liefergebühr',
            discount: 'Rabatt ({percent}%)',
            grandTotal: 'Gesamtsumme'
        },
        summary: {
            orderSummary: 'Bestellzusammenfassung',
            orderType: 'Bestelltyp',
            subtotal: 'Zwischensumme',
            deliveryFee: 'Liefergebühr',
            discount: 'Rabatt ({percent}%)',
            grandTotal: 'Gesamtsumme',
            cartEmpty: 'Ihr Warenkorb ist derzeit leer!'
        },
        success: {
            orderConfirmed: 'Bestellung bestätigt!',
            thankYouOrder: 'Vielen Dank für Ihre Bestellung. Ihre Bestellnummer lautet: #{orderNumber}',
            orderDetails: 'Bestelldetails',
            whatsNext: 'Was kommt als Nächstes?',
            onlineNext: '• Wir bereiten Ihr Essen vor<br>• Lieferung voraussichtlich in 30-45 Minuten<br>• Sie erhalten SMS-Updates',
            inHouseNext: '• Ihre Bestellung wird vorbereitet<br>• Bitte warten Sie an Ihrem Tisch<br>• Der Kellner bringt Ihr Essen gleich',
            takeawayNext: '• Ihre Bestellung wird vorbereitet<br>• Geschätzte Bereitschaftszeit: 20-30 Minuten<br>• Wir benachrichtigen Sie, wenn es abholbereit ist'
        },
        errors: {
            missingInformation: 'Fehlende Informationen',
            fillAllRequiredFields: 'Bitte füllen Sie alle erforderlichen Felder aus',
            agreeToTerms: 'Bitte stimmen Sie den Allgemeinen Geschäftsbedingungen zu',
            paymentError: 'Zahlungsfehler',
            failedToRedirectPayment: 'Weiterleitung zur Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.',
            failedToCreateCheckoutSession: 'Checkout-Sitzung konnte nicht erstellt werden',
            failedToCreateTempOrder: 'Temporäre Bestellung konnte nicht erstellt werden',
            orderNotSaved: 'Bestellung nicht gespeichert',
            orderFailed: 'Bestellung fehlgeschlagen',
            orderCouldNotBeProcessed: 'Ihre Bestellung konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.',
            paymentVerificationFailed: 'Zahlungsüberprüfung fehlgeschlagen',
            paymentVerificationFailedContact: 'Zahlungsüberprüfung fehlgeschlagen. Bitte kontaktieren Sie den Support.'
        },
        messages: {
            paymentSuccessful: 'Zahlung erfolgreich! Ihre Bestellung wurde bestätigt.'
        },
        rating: {
            thankYou: 'Vielen Dank!',
            rateExperience: 'Wie würden Sie Ihre Erfahrung bewerten?',
            submitRating: 'Bewertung absenden',
            skip: 'Überspringen'
        },
        tooltips: {
            firstName: 'Geben Sie Ihren Vornamen ein, wie er auf Ihrem Ausweis steht',
            lastName: 'Geben Sie Ihren Nachnamen ein (optional)',
            email: 'Geben Sie eine gültige E-Mail-Adresse für Bestellbestätigungen und Updates ein',
            phone: 'Geben Sie Ihre Telefonnummer mit Ländercode für Liefer-Updates ein',
            address: 'Geben Sie Ihre vollständige Straßenadresse einschließlich Haus-/Gebäudenummer ein',
            city: 'Geben Sie die Stadt ein, in die die Bestellung geliefert werden soll',
            state: 'Geben Sie Ihr Bundesland oder Ihre Provinz ein',
            postal: 'Geben Sie Ihre Postleitzahl ein',
            country: 'Geben Sie Ihren Ländernamen ein',
            specialInstructions: 'Fügen Sie besondere Lieferanweisungen hinzu (z.B. an der Tür abstellen, vor der Lieferung anrufen)',
            name: 'Geben Sie Ihren vollständigen Namen für die Bestellung ein',
            emailOptional: 'E-Mail ist optional, wird aber für Bestell-Updates empfohlen',
            tableNumber: 'Geben Sie Ihre Tischnummer ein, wenn Sie im Haus essen',
            pickupTime: 'Wählen Sie Ihre bevorzugte Abholzeit für Mitnahme-Bestellungen'
        },
        checkout: {
            secureStripe: 'Sicherer Stripe Checkout',
            trustText: 'Sie werden zur sicheren Stripe-Checkout-Seite weitergeleitet, um Ihre Zahlung abzuschließen. Nach erfolgreicher Zahlung werden Sie zurückgeleitet, um Ihre Bestellung zu bestätigen.'
        },
        orderDetail: {
            tite: 'Bestelldetails',
            paymentMethod: 'Zahlungsmethode',
            paymentOptions: 'Zahlungsoptionen werden geladen...',
            cashOnDelivery: 'Barzahlung bei Lieferung',
            payWhenreceive: 'Bezahlen Sie bei Erhalt Ihrer Bestellung',
            secureStripeCheckout: 'Bezahlen Sie bei Erhalt Ihrer Bestellung',
            securePayment: 'Sie werden zur sicheren Stripe-Checkout-Seite weitergeleitet, um Ihre Zahlung abzuschließen. Nach erfolgreicher Zahlung werden Sie zurückgeleitet, um Ihre Bestellung zu bestätigen.',
            gateWayOff: 'Online-Zahlungen sind derzeit nicht verfügbar. Sie können Ihre Bestellung weiterhin per Barzahlung bei Lieferung aufgeben.',
            terms: 'Ich stimme den Allgemeinen Geschäftsbedingungen zu'
        }
    },

    // CMS Page
    cmsPage: {
        loading: 'Lädt...',
        pageNotFound: 'Seite nicht gefunden',
        pageNotFoundDesc: 'Die gesuchte Seite existiert nicht oder wurde entfernt.',
        backToHome: 'Zurück zur Startseite',
        folder: 'Ordner',
        calendar: 'Kalender',
        tag: 'Tag'
    },

    // Landing Page
    landing: {
        loading: 'Lädt...',
        open: 'GEÖFFNET',
        closed: 'GESCHLOSSEN',
        home: 'STARTSEITE',
        allCategories: 'Alle Kategorien',
        sortBy: 'Sortieren nach',
        default: 'Standard',
        priceLowToHigh: 'Preis: Niedrig zu Hoch',
        priceHighToLow: 'Preis: Hoch zu Niedrig',
        rating: 'Bewertung',
        show: 'Anzeigen',
        show6: '6 anzeigen',
        show12: '12 anzeigen',
        show24: '24 anzeigen',
        gridView: 'Rasteransicht',
        listView: 'Listenansicht',
        category: 'Kategorie:',
        availability: 'Verfügbarkeit:',
        available: 'Verfügbar',
        unavailable: 'Nicht verfügbar',
        customerReview: 'Kundenbewertung',
        percentOff: '% RABATT',
        addToCart: 'Zum Warenkorb hinzugefügt!',
        noProductsFound: 'Keine Produkte für diese Kategorie gefunden.',
        reservation: 'Reservierung',
        reservationSubtitle: 'Wir bieten kostenlose, sichere und sofort bestätigte Online-Reservierungen.',
        fullName: 'Vollständiger Name*',
        phoneNumber: 'Telefonnummer*',
        email: 'E-Mail*',
        date: 'Datum*',
        time: 'Uhrzeit*',
        guests: 'Gäste*',
        message: 'Nachricht',
        enterFullName: 'Geben Sie Ihren vollständigen Namen ein',
        enterPhoneNumber: 'Geben Sie Ihre Telefonnummer ein',
        enterEmailAddress: 'Geben Sie Ihre E-Mail-Adresse ein',
        selectReservationDate: 'Reservierungsdatum auswählen',
        selectReservationTime: 'Reservierungszeit auswählen',
        numberOfGuests: 'Anzahl der Gäste',
        specialRequests: 'Besondere Wünsche oder Notizen hinzufügen',
        processing: 'Wird verarbeitet...',
        makeReservation: 'RESERVIERUNG VORNEHMEN',
        reservationSubmitted: 'Reservierung eingereicht!',
        submissionFailed: 'Einreichung fehlgeschlagen.',
        oops: 'Hoppla...',
        somethingWentWrong: 'Etwas ist schief gelaufen! Bitte versuchen Sie es erneut.',
        unableToLoadRestaurant: 'Restaurantinformationen konnten nicht geladen werden.',
        pickup: 'Abholung:'
    },

};
