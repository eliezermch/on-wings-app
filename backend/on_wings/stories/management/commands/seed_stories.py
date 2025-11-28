from django.core.management.base import BaseCommand
from stories.models import Story

class Command(BaseCommand):
    help = 'Seeds the database with the David and Goliath story'

    def handle(self, *args, **kwargs):
        title = "David y Goliat: El Pastor y el Gigante"
        reference = "1 Samuel 17"
        content = """El Valle de Ela

Los ejércitos de Israel y los filisteos se encontraban frente a frente en colinas opuestas, con el Valle de Ela extendiéndose entre ellos. Se había apoderado del lugar un tenso punto muerto, pero eran los filisteos quienes tenían la ventaja, no en número, sino en un único campeón.

Cada mañana y cada tarde durante cuarenta días, un gigante llamado Goliat de Gat salía de las filas filisteas. Medía casi tres metros de altura, llevaba un casco de bronce y una cota de malla que pesaba cincuenta y cinco kilos. El asta de su lanza era como el rodillo de un telar, y su punta de hierro pesaba casi siete kilos.

Goliat gritaba a las filas de Israel: "¿Por qué salen a prepararse para la batalla? ¿No soy yo un filisteo y ustedes los siervos de Saúl? Escojan a un hombre y que baje a pelear conmigo. Si él puede pelear y matarme, seremos sus esclavos; pero si yo lo venzo y lo mato, ustedes serán nuestros esclavos y nos servirán".

Al escuchar las palabras del gigante, el rey Saúl y todos los israelitas se consternaron y tuvieron mucho miedo. Nadie se atrevía a dar un paso al frente.

El Joven Pastor

Mientras tanto, en Belén, un joven pastor llamado David cuidaba las ovejas de su padre Isaí. Isaí le pidió a David que llevara grano tostado y panes a sus tres hermanos mayores, que eran soldados en el ejército de Saúl, para ver cómo estaban.

David llegó al campamento justo cuando el ejército salía a sus posiciones de batalla, gritando el grito de guerra. Corrió hacia las filas de combate y saludó a sus hermanos. Mientras hablaba con ellos, Goliat se adelantó y gritó su desafío habitual. Cuando los israelitas vieron al hombre, todos huyeron de él con gran temor.

David preguntó a los hombres que estaban cerca de él: "¿Qué se hará por el hombre que mate a este filisteo y quite esta deshonra de Israel? ¿Quién es este filisteo incircunciso para que desafíe a los escuadrones del Dios viviente?"

David ante el Rey

Las preguntas de David llegaron a oídos del rey Saúl, quien lo mandó llamar. David le dijo a Saúl: "Que nadie se desanime a causa de este filisteo; tu siervo irá y peleará contra él".

Saúl respondió: "Tú no puedes ir contra este filisteo a pelear con él; eres solo un muchacho, y él ha sido un guerrero desde su juventud".

Pero David insistió. Le contó a Saúl cómo había protegido las ovejas de su padre de leones y osos, derribándolos cuando atacaban al rebaño. "El Señor, que me libró de las garras del león y de las garras del oso, me librará de la mano de este filisteo".

Finalmente, Saúl le dijo a David: "Ve, y que el Señor esté contigo".

Saúl intentó vestir a David con su propia túnica y armadura, poniéndole un casco de bronce en la cabeza. David se ciñó la espada sobre la túnica e intentó caminar, pero no estaba acostumbrado. "No puedo andar con esto", le dijo a Saúl, "porque no estoy acostumbrado". Así que se lo quitó.

La Batalla

En lugar de armadura, David tomó su bastón en la mano. Bajó a un arroyo y escogió cinco piedras lisas, poniéndolas en su bolsa de pastor. Con su honda en la mano, se acercó al filisteo.

Goliat miró a David y vio que era poco más que un muchacho, rubio y de buen parecer, y lo despreció. Le dijo a David: "¿Soy yo un perro para que vengas a mí con palos?". Y el filisteo maldijo a David por sus dioses. "¡Ven aquí", dijo, "y daré tu carne a las aves del cielo y a las bestias del campo!".

David le dijo al filisteo: "Tú vienes contra mí con espada, lanza y jabalina, pero yo vengo contra ti en el nombre del Señor de los Ejércitos, el Dios de los escuadrones de Israel, a quien tú has desafiado. Hoy el Señor te entregará en mis manos... y toda la tierra sabrá que hay Dios en Israel. Y toda esta congregación sabrá que no es con espada ni con lanza que el Señor salva; porque la batalla es del Señor, y él los entregará a ustedes en nuestras manos".

La Victoria

Cuando el filisteo se movió para atacar, David corrió rápidamente hacia la línea de batalla para enfrentarlo. Metiendo la mano en su bolsa y sacando una piedra, la lanzó con la honda y golpeó al filisteo en la frente. La piedra se hundió en su frente, y él cayó boca abajo en tierra.

Así venció David al filisteo con una honda y una piedra; sin espada en su mano, hirió al filisteo y lo mató.

Al ver los filisteos que su héroe había muerto, dieron media vuelta y huyeron. Los hombres de Israel y de Judá se levantaron con un grito y persiguieron a los filisteos, asegurando una gran victoria ese día."""

        story, created = Story.objects.get_or_create(
            title=title,
            defaults={
                'content': content,
                'reference': reference
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f'Successfully created story "{title}"'))
        else:
            self.stdout.write(self.style.WARNING(f'Story "{title}" already exists'))
