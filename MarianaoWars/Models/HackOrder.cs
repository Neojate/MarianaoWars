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

        public int Variable { get; set; }

        public int Conditional { get; set; }

        public int Iterator { get; set; }

        public int Json { get; set; }

        public int Class { get; set; }

        public int BreakPoint { get; set; }

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

        public HackOrder() { }

        public HackOrder(int from, int to, int endTime, int variable, int conditional, int iterator, int json, int _class, int breakpoint, int type, int knowledge, int ingenyous, int coffe)
        {
            From = from;
            To = to;
            StartTime = DateTime.Now;
            EndTime = StartTime.AddSeconds(endTime);
            ReturnTime = EndTime.AddSeconds(endTime);
            Variable = variable;
            Conditional = conditional;
            Iterator = iterator;
            Json = json;
            Class = _class;
            BreakPoint = breakpoint;
            Type = type;
            Knowledge = knowledge;
            Ingenyous = ingenyous;
            Coffee = coffe;
            IsReturn = false;
        }

    }
}
