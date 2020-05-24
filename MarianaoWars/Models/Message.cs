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

        // Campo que se relaciona con el Computer
        public int ComputerId { get; set; }

        // Fecha en la que fue generado el mensaje
        public DateTime Date { get; set; }

        // A quién se envía el mensaje
        public string SendTo { get; set; }

        // Quien envía el mensaje
        public string SendFrom { get; set; }

        // Título del mensaje
        public string Title { get; set; }

        // El mensaje
        public string Body { get; set; }

        // Si el mensaje se ha visto
        public bool IsRead { get; set; }

        public Message() { }

        public Message(int computerId, string sendTo, string sendFrom, string title, string body)
        {
            ComputerId = computerId;
            Date = DateTime.Now;
            SendTo = sendTo;
            SendFrom = sendFrom;
            Title = title;
            Body = body;
            IsRead = false;
        }
    }
}
