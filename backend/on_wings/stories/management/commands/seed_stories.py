from django.core.management.base import BaseCommand
from stories.models import Story

class Command(BaseCommand):
    help = 'Seeds the database with the story'

    def handle(self, *args, **kwargs):
        title = "El Hijo Pródigo: Perdón y Restauración"
        reference = "Lucas 15:11-32"
        content = """La Petición

Un hombre tenía dos hijos. El menor de ellos, cansado de la vida en casa y deseoso de independencia, se acercó a su padre con una demanda audaz e irrespetuosa: "Padre, dame la parte de los bienes que me corresponde".

Aunque esto equivalía a desear la muerte de su padre para recibir la herencia, el padre no discutió. Con gran tristeza pero respetando la libertad de su hijo, repartió sus bienes entre ambos.

El Derroche en Tierra Lejana

Pocos días después, el hijo menor juntó todo lo que tenía y partió hacia una provincia lejana. Allí, lejos de la mirada y la guía de su padre, se entregó a una vida de desenfreno. Vivió perdidamente, malgastando su fortuna en fiestas, excesos y malas compañías, hasta que no le quedó ni una sola moneda.

La Gran Necesidad

Justo cuando había gastado todo, vino una gran hambruna en aquella provincia. El joven, que antes vestía lino fino, ahora comenzó a pasar necesidad extrema. Sin amigos ni recursos, se vio obligado a buscar trabajo con uno de los ciudadanos de aquella tierra.

El hombre lo envió a sus campos a hacer el trabajo más humillante para un judío: apacentar cerdos. El hambre era tan atroz que el joven deseaba llenar su estómago con las algarrobas que comían los cerdos, pero nadie le daba nada.

Volviendo en Sí

En medio de la suciedad y el hambre, el joven finalmente reflexionó. Se dijo a sí mismo: "¡Cuántos jornaleros en casa de mi padre tienen abundancia de pan, y yo aquí perezco de hambre!".

Tomó una decisión: "Me levantaré e iré a mi padre, y le diré: Padre, he pecado contra el cielo y contra ti. Ya no soy digno de ser llamado tu hijo; hazme como a uno de tus jornaleros". No esperaba ser restaurado como hijo, solo aspiraba a sobrevivir como un siervo más.

El Regreso y el Abrazo

Se levantó y emprendió el largo camino de regreso. Pero cuando aún estaba lejos, su padre lo vio. El padre, que probablemente había estado esperando y mirando el horizonte día tras día, fue movido a misericordia.

Rompiendo todo protocolo y dignidad de un anciano de su época, el padre corrió hacia su hijo. Se echó sobre su cuello y lo besó repetidamente, sin importarle la suciedad ni el olor a cerdos que traía el muchacho.

El hijo comenzó su discurso ensayado: "Padre, he pecado contra el cielo y contra ti, y ya no soy digno de ser llamado tu hijo...".

La Celebración

Pero el padre no lo dejó terminar la parte de "hazme como a uno de tus jornaleros". En su lugar, ordenó a sus siervos: "¡Sacad pronto el mejor vestido, y vestidle! Poned un anillo en su mano y calzado en sus pies. Traed el becerro gordo y matadlo, y comamos y hagamos fiesta. Porque este mi hijo muerto era, y ha revivido; se había perdido, y es hallado". Y comenzaron a regocijarse.

La Ira del Hermano Mayor

El hijo mayor estaba en el campo. Al regresar y acercarse a la casa, oyó la música y las danzas. Llamó a uno de los criados y le preguntó qué pasaba. El criado le respondió: "Tu hermano ha venido, y tu padre ha hecho matar el becerro gordo por haberle recibido bueno y sano".

El hermano mayor se enojó profundamente y no quería entrar. Su padre salió a rogarle que entrara, pero él le reprochó: "He aquí, tantos años te sirvo, no habiéndote desobedecido jamás, y nunca me has dado ni un cabrito para gozarme con mis amigos. Pero cuando vino este tu hijo, que ha consumido tus bienes con rameras, has hecho matar para él el becerro gordo".

La Respuesta del Padre

El padre le respondió con ternura y firmeza: "Hijo, tú siempre estás conmigo, y todas mis cosas son tuyas. Mas era necesario hacer fiesta y regocijarnos, porque este tu hermano era muerto, y ha revivido; se había perdido, y es hallado"."""

        story, created = Story.objects.get_or_create(
            title=title,
            defaults={
                'content': content,
                'reference': reference,
                'image_url': 'https://qmeziwmbzcecnoovebps.supabase.co/storage/v1/object/public/on-wings-media/hijo-prodigo.png'
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f'Successfully created story "{title}"'))
        else:
            self.stdout.write(self.style.WARNING(f'Story "{title}" already exists'))
