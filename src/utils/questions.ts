export type Question = {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export type QuestionCategory = {
  name: string
  description: string
  questions: Question[]
  color: string
  icon: string
  cromo: string
}

// ============ NUEVAS PREGUNTAS PARA NIÑOS (6-12 años) ============
// Enfoque: Pedro Moncayo, territorio, comunidad y finanzas básicas

export const NINOS_TERRITORIO_PEDRO_MONCAYO: Question[] = [
  { id: 1, text: "¿En qué provincia está el cantón Pedro Moncayo?", options: ["Pichincha", "Guayas", "Azuay", "Manabí"], correctAnswer: 0, explanation: "Pedro Moncayo es un cantón de la provincia de Pichincha." },
  { id: 2, text: "¿Cuál de estas parroquias pertenece a Pedro Moncayo?", options: ["Atuntaqui", "Tabacundo", "Baños", "Pelileo"], correctAnswer: 1, explanation: "Tabacundo es la cabecera cantonal de Pedro Moncayo." },
  { id: 3, text: "¿Qué paisaje es típico de Pedro Moncayo?", options: ["Playas", "Montañas y campos verdes", "Desiertos", "Selva tropical"], correctAnswer: 1, explanation: "El cantón se caracteriza por sus montañas y zonas agrícolas verdes." },
  { id: 4, text: "¿Qué animal es muy importante para cuidar los páramos?", options: ["Tiburón", "Cóndor", "Ballena", "Camello"], correctAnswer: 1, explanation: "El cóndor andino es un símbolo de los páramos y de la Sierra ecuatoriana." },
  { id: 5, text: "¿Por qué es importante cuidar las fuentes de agua en Pedro Moncayo?", options: ["Para jugar solamente", "Porque dan agua a las familias y cultivos", "Para hacer ruido", "No es importante"], correctAnswer: 1, explanation: "Los ríos y vertientes alimentan a las personas y a la producción agrícola." },
]

export const NINOS_FINANZAS_DIARIAS: Question[] = [
  { id: 6, text: "Si tus padres te dan mesada, ¿qué puedes hacer para organizarla mejor?", options: ["Gastar todo el mismo día", "Guardar una parte y planear tus compras", "Perder el dinero", "Regalarlo sin pensar"], correctAnswer: 1, explanation: "Separar una parte para ahorro y otra para gastos te ayuda a organizarte." },
  { id: 7, text: "¿Qué es una alcancía?", options: ["Un juguete electrónico", "Un lugar donde guardas tus monedas", "Un tipo de dulce", "Un cuaderno"], correctAnswer: 1, explanation: "La alcancía es el primer paso para aprender a ahorrar." },
  { id: 8, text: "Si en una tiendita de Pedro Moncayo un jugo cuesta $1 y tienes $2, ¿cuánto te queda si compras uno?", options: ["$1", "$0", "$3", "$2"], correctAnswer: 0, explanation: "2 dólares menos 1 dólar del jugo es igual a 1 dólar." },
  { id: 9, text: "¿Qué es mejor hacer antes de ir a la feria a comprar?", options: ["Comprar lo primero que ves", "Hacer una lista de lo necesario", "Llevar todo tu cuarto", "No mirar precios"], correctAnswer: 1, explanation: "La lista te ayuda a no olvidar lo importante y a no gastar de más." },
  { id: 10, text: "Si quieres ahorrar para una bicicleta, ¿qué deberías hacer?", options: ["Gastar en dulces todos los días", "Ahorrar un poco cada semana", "No pensar en eso", "Pedir préstamos a todos"], correctAnswer: 1, explanation: "Ahorrar poco a poco es la forma más segura de lograr metas." },
]

export const NINOS_COMUNIDAD_Y_FERIA: Question[] = [
  { id: 11, text: "En una feria del cantón, ¿qué es respetar el turno?", options: ["Meterse primero en la fila", "Esperar tu turno con paciencia", "Empujar para avanzar", "Irte sin pagar"], correctAnswer: 1, explanation: "Respetar el turno muestra respeto a los demás vecinos." },
  { id: 12, text: "Si compras en un negocio familiar de Pedro Moncayo, ¿a quién ayudas?", options: ["Solo a grandes empresas", "A la familia que atiende y a la economía local", "A otro país", "A nadie"], correctAnswer: 1, explanation: "Cuando compras local apoyas a las familias emprendedoras del cantón." },
  { id: 13, text: "Si ves basura en el parque central, ¿qué es una buena acción?", options: ["Ignorarla", "Botarla en el tacho adecuado", "Patearla", "Esconderla"], correctAnswer: 1, explanation: "Cuidar los espacios públicos es parte del amor por tu cantón." },
  { id: 14, text: "¿Qué valor se practica cuando compartes tus juegos con otros niños?", options: ["Egoísmo", "Solidaridad y amistad", "Pelea", "Enojo"], correctAnswer: 1, explanation: "Compartir fortalece la convivencia en comunidad." },
  { id: 15, text: "En una kermés escolar, ¿para qué suele servir el dinero recaudado?", options: ["Para perderlo", "Para apoyar proyectos de la escuela o comunidad", "Para guardar en un cajón", "Para premios secretos"], correctAnswer: 1, explanation: "Las kermeses ayudan a financiar actividades o mejoras comunitarias." },
]

export const NINOS_AMBIENTE_Y_PARAMO: Question[] = [
  { id: 16, text: "¿Por qué es importante no botar basura en los páramos?", options: ["Porque se ve feo solamente", "Porque contamina el agua y la naturaleza", "Para esconder cosas", "No importa"], correctAnswer: 1, explanation: "Los páramos guardan el agua que llega a las casas y cultivos." },
  { id: 17, text: "Si sembramos árboles en Pedro Moncayo, ¿qué ganamos?", options: ["Más basura", "Más sombra, aire limpio y agua protegida", "Más ruido", "Nada"], correctAnswer: 1, explanation: "Los árboles cuidan el suelo y el agua y dan hábitat a animales." },
  { id: 18, text: "¿Qué puedes hacer en casa para cuidar el agua?", options: ["Dejar la llave abierta", "Cerrar bien la llave y usar solo lo necesario", "Jugar con el chorro todo el día", "Llenar cubetas y botarlas"], correctAnswer: 1, explanation: "Usar solo el agua necesaria ayuda a toda la comunidad." },
  { id: 19, text: "Si vas de paseo al campo, ¿qué debes hacer con los desperdicios de comida?", options: ["Enterrarlos sin pensar", "Guardarlos y llevarlos de regreso a un tacho", "Botarlos al río", "Esconderlos bajo las piedras"], correctAnswer: 1, explanation: "Lo mejor es llevarte toda la basura y dejar el lugar limpio." },
  { id: 20, text: "¿Qué significa reciclar?", options: ["Usar las cosas una sola vez", "Separar papel, plástico y vidrio para darles nueva vida", "Romper todo", "Quemar basura"], correctAnswer: 1, explanation: "Reciclar reduce la basura y protege el ambiente." },
]

export const NINOS_SEGURIDAD_VIAL: Question[] = [
  { id: 21, text: "Cuando cruzas la calle en Tabacundo, ¿qué debes hacer primero?", options: ["Correr sin mirar", "Mirar a ambos lados y usar el paso cebra", "Cerrar los ojos", "Seguir a cualquiera"], correctAnswer: 1, explanation: "Mirar a los dos lados y usar el paso peatonal es lo más seguro." },
  { id: 22, text: "Si vas en bicicleta, ¿qué deberías usar para protegerte?", options: ["Sandalias", "Casco y, si es posible, chaleco reflectivo", "Zapatos de tacón", "Sombrero"], correctAnswer: 1, explanation: "El casco protege tu cabeza ante una caída." },
  { id: 23, text: "La luz verde del semáforo para peatones significa:", options: ["Detenerse", "Es seguro cruzar con cuidado", "Correr rápido", "Sentarse"], correctAnswer: 1, explanation: "La luz verde permite cruzar, siempre mirando a ambos lados." },
  { id: 24, text: "Si viajas en bus dentro del cantón, ¿qué es correcto?", options: ["Sacar el cuerpo por la ventana", "Permanecer sentado y agarrado", "Gritar al conductor", "Correr dentro del bus"], correctAnswer: 1, explanation: "Ir sentado y agarrarse disminuye el riesgo de accidentes." },
  { id: 25, text: "¿Qué debes hacer si un balón se va a la calle?", options: ["Correr tras él", "Esperar y pedir ayuda a un adulto", "Lanzarte sin mirar", "Gritar solamente"], correctAnswer: 1, explanation: "Es más seguro pedir ayuda a alguien mayor y evitar correr a la vía." },
]

export const NINOS_CULTURA_Y_TRADICION: Question[] = [
  { id: 26, text: "Una fiesta tradicional muy conocida en Pedro Moncayo es:", options: ["Carnaval de Río", "Fiestas del Maíz y la Cultura", "Inti Raymi de Cusco", "Fiesta de la Vendimia"], correctAnswer: 1, explanation: "El maíz y la cultura andina son protagonistas de las fiestas locales." },
  { id: 27, text: "¿Qué instrumento musical es típico de la Sierra ecuatoriana?", options: ["Maracas", "Charango o guitarra", "Tambor batá", "Piano de cola"], correctAnswer: 1, explanation: "Los instrumentos de cuerda acompañan muchas fiestas andinas." },
  { id: 28, text: "¿Qué valor se fortalece cuando participas en danzas tradicionales?", options: ["Pereza", "Identidad y orgullo por tu cultura", "Olvido", "Enojo"], correctAnswer: 1, explanation: "Bailar tradiciones conecta con la historia de tu pueblo." },
  { id: 29, text: "¿Por qué es importante hablar con los abuelos sobre el cantón?", options: ["Para criticar", "Porque guardan historias y costumbres", "Para pelear", "No es importante"], correctAnswer: 1, explanation: "Las personas mayores son guardianes de la memoria colectiva." },
  { id: 30, text: "Si visitas un museo o casa cultural en Pedro Moncayo, ¿qué debes hacer?", options: ["Correr y gritar", "Respetar las piezas y escuchar explicaciones", "Tomar todo", "Pintar las paredes"], correctAnswer: 1, explanation: "El respeto mantiene vivo el patrimonio cultural." },
]

export const NINOS_TURISMO_Y_RUTAS: Question[] = [
  { id: 31, text: "Cuando visitas un mirador del cantón, ¿qué NO debes hacer?", options: ["Tomar fotos", "Disfrutar del paisaje", "Botar basura", "Respirar aire puro"], correctAnswer: 2, explanation: "La basura contamina y puede llegar a ríos y animales." },
  { id: 32, text: "Si una familia abre una hostería en Pedro Moncayo, está:", options: ["Perdiendo tiempo", "Generando turismo y empleo local", "Cerrando caminos", "Huyendo del cantón"], correctAnswer: 1, explanation: "El turismo responsable genera nuevas oportunidades para todos." },
  { id: 33, text: "¿Qué debes llevar siempre en una caminata por los cerros?", options: ["Mucha basura", "Agua, gorra y abrigo", "Televisor", "Lámpara navideña"], correctAnswer: 1, explanation: "Es importante hidratarse y protegerse del frío y del sol." },
  { id: 34, text: "Si en una ruta ves un letrero de 'Zona protegida', significa que:", options: ["Puedes llevarte plantas", "Debes respetar la naturaleza", "Puedes hacer fogatas donde sea", "Puedes dejar basura"], correctAnswer: 1, explanation: "Las zonas protegidas cuidan especies y ecosistemas frágiles." },
  { id: 35, text: "¿Qué gesto es correcto con visitantes que llegan al cantón?", options: ["Ignorarlos", "Darles la bienvenida y orientarles", "Burlarse", "Cobrarles por hablar"], correctAnswer: 1, explanation: "La hospitalidad es parte de la identidad andina." },
]

export const NINOS_PARTICIPACION_Y_RESPETO: Question[] = [
  { id: 36, text: "¿Cómo pueden participar los niños en decisiones de su escuela?", options: ["Guardando silencio siempre", "Proponiendo ideas en el consejo estudiantil o a los profesores", "Peleando", "Rompendo cosas"], correctAnswer: 1, explanation: "La participación respetuosa mejora la comunidad educativa." },
  { id: 37, text: "Si un compañero nuevo llega de otra parroquia, ¿qué es lo correcto?", options: ["Ignorarlo", "Darle la bienvenida y ayudarle", "Burlarse de su acento", "No hablarle"], correctAnswer: 1, explanation: "La inclusión fortalece la convivencia." },
  { id: 38, text: "Cuando se decide algo para el barrio, ¿quiénes pueden opinar?", options: ["Solo una persona", "Las familias organizadas en mingas o reuniones", "Nadie", "Solo niños"], correctAnswer: 1, explanation: "Las mingas y asambleas barriales son espacios de decisión colectiva." },
  { id: 39, text: "¿Qué valor practicas cuando devuelves un objeto perdido que encontraste?", options: ["Trampa", "Honestidad", "Mentira", "Flojera"], correctAnswer: 1, explanation: "La honestidad genera confianza entre vecinos." },
  { id: 40, text: "En la escuela, respetar a docentes y compañeros significa:", options: ["Escucharlos, dialogar y cumplir acuerdos", "Gritarles", "No saludarlos", "Romper reglas"], correctAnswer: 0, explanation: "El respeto es la base de cualquier comunidad." },
]

// ============ NUEVAS PREGUNTAS PARA JÓVENES (13-18 años) ============
// Enfoque: emprendimiento local, finanzas, territorio y futuro sostenible

export const JOVENES_TERRITORIO_IDENTIDAD: Question[] = [
  { id: 101, text: "¿Por qué es importante conocer el Plan de Desarrollo y Ordenamiento Territorial (PDOT) de Pedro Moncayo?", options: ["Porque es un libro más", "Porque orienta cómo crecerá el cantón en ambiente, economía y sociedad", "Porque solo lo leen los técnicos", "No sirve para nada"], correctAnswer: 1, explanation: "El PDOT define la visión de futuro del territorio y las prioridades de inversión." },
  { id: 102, text: "Cuando hablamos de 'identidad territorial', nos referimos a:", options: ["Solo al mapa", "Costumbres, historias, lengua y formas de vida de la gente", "La marca de ropa", "El número de habitantes"], correctAnswer: 1, explanation: "La identidad une a la comunidad alrededor de sus raíces." },
  { id: 103, text: "Un ejemplo de patrimonio natural del cantón puede ser:", options: ["Un centro comercial", "Páramos, quebradas y miradores", "Un videojuego", "Un banco"], correctAnswer: 1, explanation: "Los ecosistemas son parte del patrimonio que debe protegerse." },
  { id: 104, text: "¿Qué riesgo trae el crecimiento urbano desordenado en Pedro Moncayo?", options: ["Mejor transporte", "Pérdida de suelos agrícolas y fuentes de agua", "Más áreas verdes", "Menos tráfico"], correctAnswer: 1, explanation: "La expansión sin planificación afecta la producción y el ambiente." },
  { id: 105, text: "La participación juvenil en cabildos y asambleas sirve para:", options: ["Perder tiempo", "Incluir la voz de los jóvenes en decisiones reales", "Generar conflictos", "Nada"], correctAnswer: 1, explanation: "Los jóvenes pueden proponer soluciones innovadoras para el territorio." },
]

export const JOVENES_FINANZAS_Y_PROYECTOS: Question[] = [
  { id: 106, text: "Si recibes un ingreso mensual fijo, la regla 50/30/20 se refiere a:", options: ["Todo para ocio", "50% necesidades, 30% deseos, 20% ahorro/inversión", "50% deudas, 50% juegos", "20% impuestos, 80% ocio"], correctAnswer: 1, explanation: "Esta regla es una guía simple para organizar tus finanzas personales." },
  { id: 107, text: "En un proyecto comunitario, el presupuesto sirve para:", options: ["Hacer dibujos", "Planear cuánto costará y cómo se utilizará el dinero", "Pedir más sin control", "Nada"], correctAnswer: 1, explanation: "El presupuesto permite ordenar gastos, tiempos y responsables." },
  { id: 108, text: "En Pedro Moncayo, un emprendimiento agroecológico puede aportar a:", options: ["Contaminar más", "Generar ingresos cuidando el suelo y el agua", "Quitar empleos", "Cerrar mercados"], correctAnswer: 1, explanation: "La agroecología combina economía con respeto ambiental." },
  { id: 109, text: "Si un joven decide endeudarse para un consumo no necesario, el principal riesgo es:", options: ["Aprender más", "No poder pagar y afectar su historial", "Tener más tiempo libre", "Ganar becas"], correctAnswer: 1, explanation: "Un mal uso del crédito limita oportunidades futuras." },
  { id: 110, text: "Una forma sana de empezar a invertir siendo joven es:", options: ["Seguir cualquier moda en redes", "Aprender primero, simular escenarios y comenzar con montos pequeños", "Pedir grandes préstamos", "Invertir sin leer contratos"], correctAnswer: 1, explanation: "La educación financiera previa reduce errores y fraudes." },
]

export const JOVENES_EMPRENDIMIENTO_LOCAL: Question[] = [
  { id: 111, text: "Un emprendimiento con identidad de Pedro Moncayo debería:", options: ["Copiar lo de otras ciudades", "Rescatar elementos locales como productos, historias o paisajes", "Ignorar la cultura", "Usar solo marcas extranjeras"], correctAnswer: 1, explanation: "El valor diferencial está en la identidad del territorio." },
  { id: 112, text: "El modelo de negocio explica:", options: ["Tu color favorito", "Cómo creas, entregas y capturas valor con tu producto o servicio", "Cuánta gente conoces", "Solo los precios"], correctAnswer: 1, explanation: "Es la base para que un emprendimiento sea sostenible." },
  { id: 113, text: "En un emprendimiento de turismo rural, el cliente valora:", options: ["Mal trato", "Autenticidad, seguridad y organización", "Desorden", "No recibir información"], correctAnswer: 1, explanation: "Una buena experiencia genera recomendaciones y reputación." },
  { id: 114, text: "Si un grupo de jóvenes arma una cooperativa, está:", options: ["Trabajando solo", "Uniendo esfuerzos para producir y vender mejor", "Perdiendo amigos", "Huyendo del cantón"], correctAnswer: 1, explanation: "Las cooperativas facilitan acceso a mercados y financiamiento." },
  { id: 115, text: "Un indicador básico para saber si tu emprendimiento funciona es:", options: ["Número de 'likes'", "Ingresos mayores que gastos de forma consistente", "Cantidad de chismes", "Horas en redes"], correctAnswer: 1, explanation: "La sostenibilidad económica es clave para mantenerse en el tiempo." },
]

export const JOVENES_AMBIENTE_Y_CAMBIO_CLIMATICO: Question[] = [
  { id: 116, text: "¿Cómo afecta el cambio climático a los páramos de Pedro Moncayo?", options: ["No los afecta", "Puede reducir el agua disponible y cambiar los ecosistemas", "Solo da más flores", "Solo afecta a la costa"], correctAnswer: 1, explanation: "El cambio climático altera lluvias, temperaturas y fuentes de agua." },
  { id: 117, text: "Una práctica productiva más sostenible en el cantón sería:", options: ["Uso masivo de químicos", "Rotación de cultivos y uso responsable del agua", "Quemar rastrojos sin control", "Talar bosques nativos"], correctAnswer: 1, explanation: "La rotación y el cuidado del suelo protegen la fertilidad y las fuentes de agua." },
  { id: 118, text: "La huella de carbono personal se reduce cuando:", options: ["Usas menos transporte motorizado y consumes local", "Compras más cosas que no usas", "Prendes luces todo el día", "Tiras comida"], correctAnswer: 0, explanation: "Moverte de forma sostenible y consumir local baja emisiones." },
  { id: 119, text: "En una minga ambiental, el objetivo principal es:", options: ["Divertirse dañando cosas", "Recuperar espacios verdes y riberas de ríos", "Pelear", "Cerrar caminos"], correctAnswer: 1, explanation: "Las mingas fortalecen la organización y el cuidado del ambiente." },
  { id: 120, text: "Un proyecto de reforestación bien planificado debe considerar:", options: ["Cualquier especie de árbol", "Especies nativas y participación comunitaria", "Solo árboles decorativos", "Plantar sin permiso"], correctAnswer: 1, explanation: "Las especies nativas se adaptan mejor y cuidan la biodiversidad." },
]

export const JOVENES_SEGURIDAD_VIAL_Y_MOVILIDAD: Question[] = [
  { id: 121, text: "¿Qué es movilidad sostenible en un cantón rural como Pedro Moncayo?", options: ["Solo usar autos privados", "Combinar caminar, bicicleta y transporte público seguro", "Cerrar veredas", "Prohibir buses"], correctAnswer: 1, explanation: "La movilidad sostenible reduce accidentes y contaminación." },
  { id: 122, text: "El exceso de velocidad en vías rurales genera:", options: ["Más adrenalina solamente", "Mayor probabilidad de accidentes con peatones, ciclistas y animales", "Más ahorro de tiempo sin riesgos", "Ningún efecto"], correctAnswer: 1, explanation: "En vías rurales suele haber personas y animales en la calzada." },
  { id: 123, text: "Un ejemplo de infraestructura que mejora la seguridad vial es:", options: ["Quitar pasos cebra", "Colocar reductores de velocidad y señalización clara", "Apagar semáforos", "Quitar iluminación"], correctAnswer: 1, explanation: "La señalización adecuada reduce la probabilidad de siniestros." },
  { id: 124, text: "En una campaña juvenil de seguridad vial se puede:", options: ["Promover el uso de casco y cinturón", "Invitar a manejar sin licencia", "Quitar señales", "Pintar sobre los letreros"], correctAnswer: 0, explanation: "Las campañas educativas salvan vidas si cambian hábitos." },
  { id: 125, text: "Conducir bajo efectos del alcohol significa:", options: ["Mayor concentración", "Un riesgo grave para tu vida y la de otros", "Más reflejos", "Conducir mejor"], correctAnswer: 1, explanation: "El alcohol reduce reflejos y la capacidad de decisión." },
]

export const JOVENES_TECNOLOGIA_Y_INNOVACION: Question[] = [
  { id: 126, text: "La tecnología puede apoyar al campo de Pedro Moncayo cuando:", options: ["Solo se usa para videojuegos", "Se usa para monitorear cultivos, clima y ventas", "Se usa para espiar vecinos", "No se usa nunca"], correctAnswer: 1, explanation: "Las herramientas digitales mejoran productividad y organización." },
  { id: 127, text: "Un ejemplo de innovación social juvenil en el cantón sería:", options: ["Un grupo que solo critica", "Un aplicativo para coordinar mingas y voluntariados", "Cerrar los parques", "No hablar con nadie"], correctAnswer: 1, explanation: "La innovación social resuelve problemas de forma creativa." },
  { id: 128, text: "La educación virtual y mixta permite a los jóvenes:", options: ["Aprender solo de memoria", "Acceder a cursos y contenidos de todo el mundo", "Evitar aprender", "No relacionarse"], correctAnswer: 1, explanation: "El acceso digital amplía oportunidades educativas." },
  { id: 129, text: "Cuando compartes información personal en redes sin cuidado, el riesgo es:", options: ["Mayor seguridad", "Exponerte a fraudes, acoso o robos de identidad", "Más becas", "Más amigos reales"], correctAnswer: 1, explanation: "Cuidar tus datos es parte de tu seguridad digital." },
  { id: 130, text: "Un hackatón juvenil en Pedro Moncayo podría servir para:", options: ["Competir sin sentido", "Crear soluciones tecnológicas para problemas del cantón", "Jugar sin reglas", "Cerrar escuelas"], correctAnswer: 1, explanation: "Los hackatones canalizan ideas jóvenes hacia proyectos concretos." },
]

export const JOVENES_FUTURO_Y_PROYECTO_DE_VIDA: Question[] = [
  { id: 131, text: "El proyecto de vida se refiere a:", options: ["Solo a elegir una carrera", "La combinación de metas personales, familiares, profesionales y comunitarias", "Comprar muchas cosas", "Viajar sin rumbo"], correctAnswer: 1, explanation: "Un proyecto de vida integra lo que quieres ser y aportar." },
  { id: 132, text: "Ahorrar desde joven para estudiar o emprender te da:", options: ["Menos opciones", "Más libertad para decidir en el futuro", "Menos disciplina", "Problemas con todos"], correctAnswer: 1, explanation: "El ahorro temprano abre puertas cuando aparecen oportunidades." },
  { id: 133, text: "La salud mental en la adolescencia influye en tus finanzas porque:", options: ["No se relacionan", "Una buena gestión emocional ayuda a tomar decisiones más conscientes", "Solo importa el dinero", "No influye"], correctAnswer: 1, explanation: "El bienestar integral permite planear y sostener proyectos de vida." },
  { id: 134, text: "Diversificar habilidades (tecnología, agricultura, arte) en el cantón permite:", options: ["Tener menos trabajo", "Adaptarte mejor a los cambios económicos", "Abandonar el territorio", "No aprender nada"], correctAnswer: 1, explanation: "Quien tiene varias habilidades puede reorientarse cuando el contexto cambia." },
  { id: 135, text: "La libertad financiera se acerca cuando:", options: ["Gasto todo lo que gano", "Tus ingresos cubren tus gastos y te permiten ahorrar e invertir con propósito", "Nunca revisas tus cuentas", "Vives solo de crédito"], correctAnswer: 1, explanation: "Controlar gastos, ahorrar e invertir consistentemente te acerca a esa meta." },
]

// Combinar todas las preguntas por categoría de edad
export const NINOS_QUESTIONS: Question[] = [
  ...NINOS_TERRITORIO_PEDRO_MONCAYO,
  ...NINOS_FINANZAS_DIARIAS,
  ...NINOS_COMUNIDAD_Y_FERIA,
  ...NINOS_AMBIENTE_Y_PARAMO,
  ...NINOS_SEGURIDAD_VIAL,
  ...NINOS_CULTURA_Y_TRADICION,
  ...NINOS_TURISMO_Y_RUTAS,
  ...NINOS_PARTICIPACION_Y_RESPETO,
]

export const JOVENES_QUESTIONS: Question[] = [
  ...JOVENES_TERRITORIO_IDENTIDAD,
  ...JOVENES_FINANZAS_Y_PROYECTOS,
  ...JOVENES_EMPRENDIMIENTO_LOCAL,
  ...JOVENES_AMBIENTE_Y_CAMBIO_CLIMATICO,
  ...JOVENES_SEGURIDAD_VIAL_Y_MOVILIDAD,
  ...JOVENES_TECNOLOGIA_Y_INNOVACION,
  ...JOVENES_FUTURO_Y_PROYECTO_DE_VIDA,
]

// Sistema de categorías por edad con nueva paleta azul-blanco-verde
export const QUESTION_CATEGORIES_NINOS: Record<string, QuestionCategory> = {
  territorio: {
    name: "Mi Cantón",
    description: "Conoce Pedro Moncayo",
    questions: NINOS_TERRITORIO_PEDRO_MONCAYO,
    color: "#1d4ed8",
    icon: "flag",
    cromo: "/favicon.svg",
  },
  finanzas_diarias: {
    name: "Dinero Día a Día",
    description: "Mesada y ahorro",
    questions: NINOS_FINANZAS_DIARIAS,
    color: "#0ea5e9",
    icon: "dollar",
    cromo: "/vite.svg",
  },
  comunidad_feria: {
    name: "Comunidad y Feria",
    description: "Vida en barrio y escuela",
    questions: NINOS_COMUNIDAD_Y_FERIA,
    color: "#10b981",
    icon: "users",
    cromo: "/favicon.svg",
  },
  ambiente_paramo: {
    name: "Agua y Páramo",
    description: "Cuidar la naturaleza",
    questions: NINOS_AMBIENTE_Y_PARAMO,
    color: "#22c55e",
    icon: "leaf",
    cromo: "/vite.svg",
  },
  seguridad_vial: {
    name: "Seguridad Vial",
    description: "Moverse con cuidado",
    questions: NINOS_SEGURIDAD_VIAL,
    color: "#2563eb",
    icon: "car",
    cromo: "/favicon.svg",
  },
  cultura_tradicion: {
    name: "Cultura Viva",
    description: "Fiestas y tradiciones",
    questions: NINOS_CULTURA_Y_TRADICION,
    color: "#0ea5e9",
    icon: "book",
    cromo: "/vite.svg",
  },
  turismo_rutas: {
    name: "Rutas y Paisajes",
    description: "Turismo responsable",
    questions: NINOS_TURISMO_Y_RUTAS,
    color: "#10b981",
    icon: "map",
    cromo: "/favicon.svg",
  },
  participacion_respeto: {
    name: "Respeto y Voz",
    description: "Participar en comunidad",
    questions: NINOS_PARTICIPACION_Y_RESPETO,
    color: "#22c55e",
    icon: "users",
    cromo: "/vite.svg",
  },
}

export const QUESTION_CATEGORIES_JOVENES: Record<string, QuestionCategory> = {
  territorio_identidad: {
    name: "Territorio e Identidad",
    description: "Planificar Pedro Moncayo",
    questions: JOVENES_TERRITORIO_IDENTIDAD,
    color: "#1d4ed8",
    icon: "map",
    cromo: "/favicon.svg",
  },
  finanzas_proyectos: {
    name: "Finanzas y Proyectos",
    description: "Organiza tus recursos",
    questions: JOVENES_FINANZAS_Y_PROYECTOS,
    color: "#2563eb",
    icon: "calculator",
    cromo: "/vite.svg",
  },
  emprendimiento_local: {
    name: "Emprende Local",
    description: "Ideas con identidad",
    questions: JOVENES_EMPRENDIMIENTO_LOCAL,
    color: "#10b981",
    icon: "trending-up",
    cromo: "/favicon.svg",
  },
  ambiente_clima: {
    name: "Ambiente y Clima",
    description: "Páramo y cambio climático",
    questions: JOVENES_AMBIENTE_Y_CAMBIO_CLIMATICO,
    color: "#22c55e",
    icon: "leaf",
    cromo: "/vite.svg",
  },
  seguridad_vial_movilidad: {
    name: "Movilidad Segura",
    description: "Transporte y prevención",
    questions: JOVENES_SEGURIDAD_VIAL_Y_MOVILIDAD,
    color: "#0ea5e9",
    icon: "car",
    cromo: "/favicon.svg",
  },
  tecnologia_innovacion: {
    name: "Tecnología e Innovación",
    description: "Soluciones para el cantón",
    questions: JOVENES_TECNOLOGIA_Y_INNOVACION,
    color: "#38bdf8",
    icon: "cpu",
    cromo: "/vite.svg",
  },
  futuro_proyecto_vida: {
    name: "Proyecto de Vida",
    description: "Tu futuro y tu cantón",
    questions: JOVENES_FUTURO_Y_PROYECTO_DE_VIDA,
    color: "#1e40af",
    icon: "star",
    cromo: "/favicon.svg",
  },
}

// Funciones
export const getQuestionCategories = (ageCategory: 'ninos' | 'jovenes') =>
  ageCategory === 'ninos' ? QUESTION_CATEGORIES_NINOS : QUESTION_CATEGORIES_JOVENES

export const getAllQuestions = (ageCategory: 'ninos' | 'jovenes') =>
  ageCategory === 'ninos' ? NINOS_QUESTIONS : JOVENES_QUESTIONS