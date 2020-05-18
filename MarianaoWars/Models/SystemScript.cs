using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class SystemScript
    {
        public static int ATTACK = 1;
        public static int DEFENSE = 2;
        public static int TRANSPORT = 3;
        public static int COLONIZATOR = 4;

        // Identificador del systemscript. Primary key autoincremental.
        public int Id { get; set; }

        // Identificador global de la estructura
        public int BuildId { get; set; }

        // Nombre
        public string Name { get; set; }

        // Descripcion
        public string Description { get; set; }

        // Ataque
        public double BasePower { get; set; }

        // Defensa
        public double BaseDefense { get; set; }

        // Vida
        public double  BaseIntegrity { get; set; }

        // Tiempo de construccion
        public int Time { get; set; }

        // Recursos de conocimiento necesarios
        public int NeedKnowledge { get; set; }

        // Recursos de ingenio necesarios
        public int NeedIngenyous { get; set; }

        // Recursos de café necesarios
        public int NeedCoffee { get; set; }

        // Tipo de script
        public int Type { get; set; }
    }
}
