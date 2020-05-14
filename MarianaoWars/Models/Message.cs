using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class Message
    {
        // Id del mensaje. Primary Key Autoincremental.
        public int Id { get; set; }

        // Id de la matrícula a la que hace referencia.
        public int EnrollmentId { get; set; }

        // Fecha en la que fue generado el mensaje
        public DateTime Date { get; set; }

        // A quién se envía el mensaje
        public string ToSend { get; set; }

        // Quien envía el mensaje
        public string FromSend { get; set; }

        // Título del mensaje
        public string Title { get; set; }

        // El mensaje
        public string Body { get; set; }

        // Si el mensaje se ha visto
        public bool IsWatched { get; set; }
    }
}
