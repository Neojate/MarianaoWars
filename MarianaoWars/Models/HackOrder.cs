using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class HackOrder
    {
        // Identificador del HackOrder. Primary Key Autoincremental.
        public int Id { get; set; }

        // Identificador del ordenador que hace el Hack.
        public int From { get; set; }

        // Identificador del ordenador que recibe el Hack.
        public int To { get; set; }

        // Fecha a la que se crea la Orden.
        public DateTime StartTime { get; set; }

        // Fecha a la que se llega al destino
        public DateTime EndTime { get; set; }

        // Fecha a la que se vuelve 
        public DateTime ReturnTime { get; set; }

        // Tipo de Hack
        public int Type { get; set; }

        // Transporte de Conocimiento
        public int Knowledge { get; set; }

        // Transporte de ingenio
        public int Ingenyous { get; set; }

        // Transporte de café
        public int Coffee { get; set; }

        // Si está volviendo ya o no
        public bool IsReturn { get; set; }

    }
}
