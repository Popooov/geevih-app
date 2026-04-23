import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Building2, ExternalLink, FileText, Lock, Scale, Shield } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

function Section({
    id,
    title,
    icon: Icon,
    children,
}: {
    id: string;
    title: string;
    icon: ComponentType<{ className?: string }>;
    children: ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24 rounded-[2rem] bg-background p-5 shadow-sm ring-1 ring-border/50 lg:p-8">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                </div>

                <h2 className="font-headline text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
            </div>

            <div className="space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
        </section>
    );
}

export default function LegalNotice() {
    const sections = [
        { id: 'titularidad', label: 'Titularidad' },
        { id: 'uso', label: 'Uso del sitio' },
        { id: 'propiedad', label: 'Propiedad intelectual' },
        { id: 'enlaces', label: 'Enlaces externos' },
        { id: 'funcionamiento', label: 'Funcionamiento y seguridad' },
        { id: 'privacidad', label: 'Privacidad y datos' },
        { id: 'cookies', label: 'Cookies' },
        { id: 'legislacion', label: 'Legislación aplicable' },
    ];

    return (
        <AppLayout>
            <Head title="Aviso legal y política de privacidad | GEEVIH" />

            <div className="mx-auto max-w-5xl px-4 pt-4 pb-14 sm:px-6 lg:px-8 lg:pt-6 lg:pb-16">
                <div className="space-y-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-5 py-7 backdrop-blur-xl sm:px-6 sm:py-8 lg:px-8 lg:py-10 dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.14),transparent_60%)]" />

                        <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                    <FileText className="h-4 w-4" />
                                    Información legal
                                </div>

                                <div className="space-y-3">
                                    <h1 className="font-headline text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-5xl">
                                        Aviso legal y política de privacidad
                                    </h1>

                                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                        En esta página se recoge el texto legal facilitado para revisión por SEISIDA, manteniendo su contenido y
                                        estructura para validación.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] bg-white/85 p-5 ring-1 ring-black/5 backdrop-blur-sm sm:p-6 dark:bg-white/5 dark:ring-white/10">
                                <p className="text-xs font-semibold tracking-[0.14em] text-foreground/70 uppercase dark:text-muted-foreground">
                                    Índice
                                </p>

                                <div className="mt-4 grid gap-1.5">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="rounded-xl px-3 py-2 text-sm text-foreground/70 transition hover:bg-primary/6 hover:text-primary dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-white"
                                        >
                                            {section.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="rounded-[2rem] bg-background p-5 shadow-sm ring-1 ring-border/50 lg:p-8">
                        <div className="space-y-4 text-sm leading-7 text-muted-foreground">
                            <p>
                                El presente texto regula las condiciones de uso y navegación a través de este sitio web. El acceso y/o uso del mismo
                                implica la aceptación expresa y sin reservas de las presentes condiciones que le rogamos lea detenidamente. Si no
                                estuviera de acuerdo con las condiciones de uso no acceda ni utilice el presente sitio web.
                            </p>

                            <p>
                                La Sociedad Española Interdisciplinaria del Síndrome de Inmunodeficiencia Adquirida (SEISIDA), titular del presente
                                dominio, se reserva la facultad de llevar a cabo en cualquier momento y sin necesidad de preaviso, cualquier
                                modificación de cuantos elementos integren el diseño, contenido y configuración de la web, ampliar o reducir
                                servicios, o modificar las presentes condiciones generales. El acceso del usuario tras cualquier modificación supone
                                la aceptación de los cambios que se realicen.
                            </p>
                        </div>
                    </div>

                    <Section id="titularidad" title="1. Información y titularidad" icon={Building2}>
                        <p>
                            SEISIDA es la titular del dominio, con domicilio en la calle Glorieta de Quevedo, 9 – 5º – C.P. 28015 Madrid (España), con
                            CIF G79176319, inscrita en el Registro Nacional de Asociaciones, Sección 1ª, Número Nacional 80709. Si desea ponerse en
                            contacto con nosotros puede hacerlo a través de la siguiente dirección de correo electrónico:{' '}
                            <a href="mailto:seisida@seisida.net" className="font-medium text-primary hover:underline">
                                seisida@seisida.net
                            </a>
                            .
                        </p>
                    </Section>

                    <Section id="uso" title="2. Uso del sitio web" icon={Scale}>
                        <p>
                            El usuario accede a la página web bajo su exclusiva responsabilidad. En caso de menores de edad, para hacer uso del
                            presente sitio web, y acceder a sus contenidos, deberán contar con el consentimiento de sus padres, tutores, o
                            representantes legales. Los contenidos mostrados en la página web, así como los comentarios e información en cualquiera de
                            las plataformas o redes sociales que SEISIDA pudiera utilizar como canales de comunicación, son meramente informativos sin
                            que puedan en ningún caso tener otra consideración. El acceso al sitio web no supone en modo alguno, el inicio de una
                            relación comercial con el titular de la misma. SEISIDA no es responsable de los daños o perjuicios que pudieran derivarse
                            de la utilización de la información del presente sitio web ni tampoco de los daños sufridos o pérdidas económicas que, de
                            forma directa o indirecta, produzcan o puedan producir perjuicios económicos, materiales o sobre datos, provocados por el
                            uso de dicha información.
                        </p>

                        <p>
                            SEISIDA no se hace responsable de los daños y perjuicios que pudiera ocasionar la utilización de las herramientas e
                            informaciones contenidas en su Web en relación con la adopción de decisiones sobre el inicio, desarrollo o resultado de
                            procedimientos administrativos. Tales decisiones deben ser contrastadas en los centros, organismos o dependencias
                            competentes.
                        </p>

                        <p>
                            En cualquier caso, la información y contenidos de esta web no podrá ser alegada en procesos contradictorios con la
                            Administración Pública, no asumiendo responsabilidad alguna por las discrepancias que pudiesen existir entre los
                            documentos impresos de la Administración competente y la publicación electrónica en estas páginas.
                        </p>

                        <p>
                            En este sentido, no se garantiza que un documento normativo disponible en línea reproduzca exactamente un texto adoptado
                            oficialmente, por lo que únicamente se consideran auténticos los textos legales publicados en las ediciones del Boletín
                            Oficial del Estado (BOE), del Diario Oficial de la Unión Europea o cualquiera otro Boletín o Diario de carácter oficial.
                        </p>

                        <p>
                            En el caso de que el usuario envíe cualquier tipo de información a SEISIDA, declara y garantiza que la envía libremente y
                            que dicha información no infringe derechos de propiedad intelectual, industrial, secreto comercial o cualesquiera otros y
                            que no tiene carácter confidencial ni es perjudicial para terceros. En dicho registro el Usuario será responsable de
                            aportar información veraz y lícita. El Usuario se compromete a hacer un uso adecuado de los contenidos y servicios que
                            SEISIDA ofrece o pudiera ofrecer a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para
                            incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público; difundir contenidos o propaganda
                            de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o que atente contra los derechos humanos;
                            provocar daños en los sistemas físicos y lógicos de SEISIDA, de sus proveedores o de terceras personas, introducir o
                            difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar
                            los daños anteriormente mencionados; intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros
                            usuarios y modificar o manipular sus mensajes. SEISIDA se reserva el derecho de retirar todos aquellos comentarios y
                            aportaciones que pudieran vulnerar el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas,
                            que atenten contra el orden o la seguridad pública o que, a su juicio, no resultaran adecuados para su publicación. En
                            cualquier caso, SEISIDA no será responsable de las opiniones vertidas por los usuarios a través de los foros, chats, u
                            otras herramientas de participación que pudieran establecerse.
                        </p>

                        <p>
                            Si el usuario tuviera conocimiento de la existencia de algún contenido ilícito, ilegal, contrario a las leyes o que
                            pudiera suponer una infracción de derechos de propiedad intelectual y/o industrial, rogamos lo notifique a SEISIDA a
                            través del siguiente correo electrónico{' '}
                            <a href="mailto:seisida@seisida.net" className="font-medium text-primary hover:underline">
                                seisida@seisida.net
                            </a>
                            .
                        </p>
                    </Section>

                    <Section id="propiedad" title="3. Propiedad intelectual" icon={Shield}>
                        <p>
                            SEISIDA es titular, o cuenta con las licencias correspondientes en su caso, sobre los derechos de explotación de propiedad
                            intelectual e industrial del sitio web, incluyendo todos los contenidos ofrecidos en el mismo (a título enunciativo, no
                            limitativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y
                            diseño, selección de materiales usados, acceso y uso, etc.). El acceso y/o utilización del sitio web por parte del usuario
                            no implicará en ningún caso la renuncia, transmisión, licencia o cesión total o parcial de los anteriores derechos por
                            parte de SEISIDA.
                        </p>

                        <p>
                            Quedan reservados todos los derechos de propiedad intelectual e industrial sobre los contenidos del sitio web y en
                            particular quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su
                            modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en
                            cualquier soporte y por cualquier medio técnico, sin la autorización previa y por escrito de SEISIDA. El Usuario se
                            compromete a respetar los derechos de Propiedad Intelectual e Industrial titularidad de SEISIDA. Podrá visualizar los
                            elementos del portal e imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte
                            físico siempre y cuando sea, única y exclusivamente, para su uso personal y privado. El Usuario deberá abstenerse de
                            suprimir, alterar o manipular indicaciones de copyright u otros elementos que sirvan para identificar a los titulares de
                            derechos, así como cualquier dispositivo de protección o sistema de seguridad que estuviera instalado en las páginas de
                            SEISIDA.
                        </p>

                        <p>
                            Las referencias a marcas o nombres comerciales u otros signos distintivos, ya sean de SEISIDA o de terceros, llevan
                            implícita la prohibición de su uso sin el consentimiento de su legítimo titular.
                        </p>
                    </Section>

                    <Section id="enlaces" title="4. Enlaces" icon={ExternalLink}>
                        <p>
                            La inclusión de enlaces para acceder a plataformas y redes sociales pertenecientes a terceros tiene como finalidad
                            posibilitar el acceso al usuario a los diferentes canales que SEISIDA pudiera mantener en los mismos, sin que el
                            establecimiento de estas aplicaciones implique la existencia de relación alguna entre SEISIDA y el titular, fabricante o
                            distribuidor de la plataforma en cuestión ni la aceptación y/o aprobación por parte de SEISIDA de sus contenidos o
                            servicios. SEISIDA no asume ninguna responsabilidad sobre la configuración de dichas plataformas o redes sociales ni sobre
                            los contenidos o servicios a los que el usuario pueda acceder a través de los mismos. La información que el usuario
                            proporcione a estas plataformas será bajo su responsabilidad, sin que SEISIDA intervenga en dicho proceso. Asimismo,
                            SEISIDA se reserva el derecho a no seguir a los usuarios que comiencen a seguir su perfil social.
                        </p>

                        <p>
                            Teniendo en cuenta la imposibilidad de control sobre los contenidos, la información o los servicios ofrecidos por otros
                            sitios web a los que se pueda acceder por enlaces que sean puestos a disposición en nuestra página web, SEISIDA queda
                            eximida de cualquier responsabilidad por los daños y perjuicios de cualquier clase que pudieran derivar de la utilización
                            por parte del usuario de páginas webs ajenas o de los contenidos de las mismas.
                        </p>

                        <p>
                            Los hiperenlaces en sitios webs ajenos que permitan al acceso a la página web de SEISIDA, no implicarán en ningún caso la
                            existencia de relaciones comerciales o mercantiles con el titular del sitio web donde se establezca el hiperenlace, ni la
                            aceptación por parte de SEISIDA de cualesquiera contenidos o servicios. SEISIDA no autoriza el establecimiento de un
                            enlace al sitio web desde páginas que contengan contenidos ilícitos, degradantes, obscenos y/o que contravengan las leyes,
                            el orden público o las normas sociales generalmente aceptadas. El usuario que quiera introducir enlaces al portal de
                            SEISIDA desde otros sitios web estará obligado a que dicho enlace vincule con la página, no pudiendo reproducirla de
                            ninguna forma. Tampoco podrán establecerse marcos o “frames” que rodeen el portal o que hagan que su visualización se
                            realice a través de direcciones de internet distintas o conjuntamente con contenidos ajenos al sitio web.
                        </p>
                    </Section>

                    <Section id="funcionamiento" title="5. Funcionamiento del sitio web y seguridad" icon={Shield}>
                        <p>
                            SEISIDA no garantiza la disponibilidad y continuidad del funcionamiento del sitio web. Asimismo, no será en ningún caso
                            responsable por cualesquiera daños y perjuicios que puedan derivarse de la interrupción en el funcionamiento de la
                            Plataforma o fallos informáticos, averías, desconexiones, retrasos o bloqueos causados por deficiencias o sobrecargas en
                            torno a los sistemas o mecanismos que permiten su funcionamiento, la falta de idoneidad del sitio web para las necesidades
                            específicas de los usuarios, así como otros daños que pudieran ser causados por terceras personas mediante intromisiones
                            no autorizadas ajenas al control de SEISIDA.
                        </p>

                        <p>
                            Si bien SEISIDA adopta diversas medidas de seguridad en su sitio web. No obstante, los sistemas informáticos no son
                            infalibles, y no se garantiza la ausencia de virus ni de otros elementos en el sitio web introducidos por terceros ajenos
                            a SEISIDA y que puedan producir alteraciones en los sistemas físicos o lógicos de los usuarios o en los documentos,
                            archivos y ficheros almacenados en sus sistemas. SEISIDA no será en ningún caso responsable de los daños y perjuicios que
                            pudieran derivarse de usos no autorizados.
                        </p>

                        <p>
                            SEISIDA se reserva el derecho a suspender sin previo aviso el acceso a los usuarios que, a su juicio, incumplan las normas
                            de utilización del sitio web y a ejercer las medidas legales que correspondan, sin que por ello se genere derecho alguno a
                            indemnización en favor del usuario que pudiera verse afectado directa o indirectamente.
                        </p>
                    </Section>

                    <Section id="privacidad" title="6. Política de privacidad y protección de datos" icon={Lock}>
                        <p>
                            De conformidad con el Reglamento (UE) 2016/679 del Parlamento y del Consejo de 27 de abril de 2016 relativo a la
                            protección de las personas físicas en lo que respecta al tratamiento de sus datos personales y la libre circulación de
                            éstos, la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales,
                            los datos que voluntariamente facilite el usuario serán tratados por SEISIDA, por lo que se informa a continuación de su
                            política de privacidad y protección de datos. El acceso y/o uso de este sitio web de la SEISIDA implica la aceptación de
                            la política de privacidad, que le rogamos lea detenidamente, así como nuestra política de cookies, que puede consultar en
                            el siguiente enlace. Si no estuviera de acuerdo con las condiciones no acceda ni utilice el presente sitio web.
                        </p>

                        <p>
                            Mostramos a continuación, de manera resumida, cómo se tratarán tus datos personales, si bien te rogamos que leas con
                            detenimiento el resto de nuestra política de privacidad y protección de datos.
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[720px] border-separate border-spacing-y-3">
                                <tbody>
                                    <tr className="bg-muted/35">
                                        <td className="w-[220px] rounded-l-2xl px-4 py-4 text-sm font-medium text-foreground">
                                            Responsable del tratamiento
                                        </td>
                                        <td className="rounded-r-2xl px-4 py-4 text-sm text-muted-foreground">
                                            SEISIDA con domicilio en calle Glorieta de Quevedo, 9 – 5º – C.P. 28015 Madrid (España), con CIF
                                            G79176319.
                                        </td>
                                    </tr>
                                    <tr className="bg-muted/35">
                                        <td className="w-[220px] rounded-l-2xl px-4 py-4 text-sm font-medium text-foreground">
                                            Finalidad del tratamiento
                                        </td>
                                        <td className="rounded-r-2xl px-4 py-4 text-sm text-muted-foreground">
                                            Gestión del sitio web; Comunicaciones con usuarios; Gestión y resolución de consultas; Gestión del Usuario
                                            Registrado; Gestión de redes sociales; Gestión de formaciones solicitadas; Tratamiento de los datos de
                                            navegación de acuerdo con la Política de cookies.
                                        </td>
                                    </tr>
                                    <tr className="bg-muted/35">
                                        <td className="w-[220px] rounded-l-2xl px-4 py-4 text-sm font-medium text-foreground">
                                            ¿A quién se pueden comunicar los datos?
                                        </td>
                                        <td className="rounded-r-2xl px-4 py-4 text-sm text-muted-foreground">
                                            A Jueces y Tribunales, y a otras entidades o administraciones públicas cuando la ley así lo determine.
                                        </td>
                                    </tr>
                                    <tr className="bg-muted/35">
                                        <td className="w-[220px] rounded-l-2xl px-4 py-4 text-sm font-medium text-foreground">
                                            ¿Durante cuánto tiempo se conservan los datos?
                                        </td>
                                        <td className="rounded-r-2xl px-4 py-4 text-sm text-muted-foreground">
                                            Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que hayan sido
                                            recabados y mientras puedan derivarse responsabilidades en relación con dichos datos.
                                        </td>
                                    </tr>
                                    <tr className="bg-muted/35">
                                        <td className="w-[220px] rounded-l-2xl px-4 py-4 text-sm font-medium text-foreground">
                                            ¿Qué derechos tiene como Usuario?
                                        </td>
                                        <td className="rounded-r-2xl px-4 py-4 text-sm text-muted-foreground">
                                            Puede contactar con SEISIDA y solicitar el ejercicio de tus derechos, que podrá consistir en acceso a los
                                            datos personales, rectificar los datos inexactos o solicitar su supresión cuando los datos ya no sean
                                            necesarios, solicitar la limitación del tratamiento, la portabilidad de los datos, el derecho de oposición
                                            o la retirada del consentimiento, en la siguiente dirección postal: calle Glorieta de Quevedo, 9 – 5º –
                                            C.P. 28015 Madrid (España). También puede ejercitar sus derechos enviando un correo electrónico a la
                                            siguiente dirección:{' '}
                                            <a href="mailto:seisida@seisida.net" className="font-medium text-primary hover:underline">
                                                seisida@seisida.net
                                            </a>
                                            .
                                        </td>
                                    </tr>
                                    <tr className="bg-muted/35">
                                        <td className="w-[220px] rounded-l-2xl px-4 py-4 text-sm font-medium text-foreground">
                                            Información adicional
                                        </td>
                                        <td className="rounded-r-2xl px-4 py-4 text-sm text-muted-foreground">
                                            Rogamos lea detenidamente la información detallada sobre nuestra Política de privacidad.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            El responsable del tratamiento de datos es SEISIDA es la titular del presente dominio, con domicilio en la calle Glorieta
                            de Quevedo, 9 – 5º – C.P. 28015 Madrid (España), con CIF CIF G79176319. Para cualquier cuestión relacionada con la
                            política de privacidad y protección de datos puede contactar con nosotros a través de la siguiente dirección de correo
                            electrónico:{' '}
                            <a href="mailto:seisida@seisida.net" className="font-medium text-primary hover:underline">
                                seisida@seisida.net
                            </a>
                            .
                        </p>

                        <p>
                            El tratamiento de los datos personales (identificativos y de contacto) que nos haya podido facilitar, tiene como finalidad
                            dar curso a su solicitud con el fin de prestarle la información que solicite, así como para gestionar, en su caso, el
                            acceso a la formación solicitada ya sea como docente, como alumno o en cualquier otra categoría. Dependiendo de la
                            solicitud, podremos pedirle además su dirección, número de teléfono, dirección de email, datos de pago y fecha de
                            nacimiento. Para el alta podremos pedir también información sobre su documento de identificación (pasaporte, Documento
                            Nacional de Identidad o similar). En caso de no rellenar las preguntas marcadas con un asterisco, SEISIDA no podrá aceptar
                            y gestionar el servicio o la consulta formulada. Con su consentimiento, los datos también podrán ser utilizados para
                            remitir boletines electrónicos de noticias o información de SEISIDA que pudieran ser de su interés. En caso de que nos
                            remita su curriculum vitae (CV) o se inscriba en alguna oferta de trabajo que SEISIDA pudiera publicar, trataremos los
                            datos con el fin de valorar y gestionar su solicitud de empleo y, en su caso, llevar a cabo las actuaciones necesarias
                            para la selección y contratación de personal. Le informamos de que, en ningún caso, se adoptarán decisiones automatizadas
                            en base a su perfil. Los datos que nos proporcione para la asistencia como alumno o como
                        </p>

                        <p>
                            El usuario manifiesta que los datos que facilita son verdaderos, completos y actualizados, siendo responsable de cualquier
                            daño o perjuicio, directo o indirecto, que pudiera ocasionar su incumplimiento. En caso de que el usuario facilitara datos
                            de terceros, manifiesta contar con su consentimiento y se compromete a informarle adecuadamente de lo contenido en este
                            aviso legal.
                        </p>

                        <p>
                            Los datos personales facilitados por los usuarios serán conservados durante el plazo adecuado para la realización de las
                            actividades para las que fueron recogidos. Posteriormente, se mantendrán como máximo durante los plazos legalmente
                            establecidos.
                        </p>

                        <p>
                            Se le informa asimismo de que dispone de los derechos de acceso, rectificación, supresión (derecho al olvido), oposición,
                            de portabilidad de datos, y de limitación del tratamiento, que podrá ejercitar en cualquier momento accediendo al
                            siguiente con el asunto “TRATAMIENTO DE DATOS”, a través de nuestro correo electrónico{' '}
                            <a href="mailto:seisida@seisida.net" className="font-medium text-primary hover:underline">
                                seisida@seisida.net
                            </a>
                            , o por correo postal, o medio análogo de envío a SEISIDA calle Glorieta de Quevedo, 9 – 5º – C.P. 28015 Madrid (España)
                            acompañando en todo caso fotocopia de su D.N.I. o documento identificativo válido equivalente, especificando qué derecho
                            quiere ejercer, y cumpliendo los requisitos contemplados en el Reglamento General de Protección de Datos así como en la
                            Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales.
                        </p>

                        <p>
                            Le informamos asimismo de que puede obtener más información en materia de protección de datos o presentar, en su caso de
                            considerarlo oportuno, una reclamación ante la Agencia Española de Protección de Datos. Dispone de toda la información en
                            su página web:{' '}
                            <a
                                href="https://www.agpd.es"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="font-medium text-primary hover:underline"
                            >
                                www.agpd.es
                            </a>
                            .
                        </p>
                    </Section>

                    <Section id="cookies" title="7. Política de cookies" icon={FileText}>
                        <p>
                            Utilizamos cookies en varias situaciones en nuestro sitio web, puede consultar más detalles en la sección{' '}
                            <Link href="/politica-de-cookies" className="font-medium text-primary hover:underline">
                                Política de Cookies
                            </Link>
                            .
                        </p>
                    </Section>

                    <Section id="legislacion" title="8. Nulidad parcial, legislación aplicable y fuero" icon={Scale}>
                        <p>
                            En caso de que cualquiera de las disposiciones o apartados de las presentes condiciones de uso fuese declarada nula total
                            o parcialmente, dicha nulidad no afectará a la validez del resto, que permanecerán en vigor.
                        </p>

                        <p>
                            El presente aviso legal se rige por la Ley Española. Para cualquier controversia que pudiera suscitarse sobre
                            interpretación y cumplimiento de lo expuesto en el mismo, nos sometemos a la jurisdicción de los Juzgados y Tribunales de
                            Madrid capital.
                        </p>
                    </Section>
                </div>
            </div>
        </AppLayout>
    );
}
