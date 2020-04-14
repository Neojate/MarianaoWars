using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class Resource
    {
        // ID del Resource. Primary Key Autoincremental.
        public int Id { get; set; }

        // Indica el almacenamiento de Conocimiento invertidos en el ordenador.
        public int Knowledge { get; set; }

        // Indica el almacenamiento de Habilidad invertidos en el ordenador.
        public int Ingenyous { get; set; }

        // Indica el almacenamiento de Café invertidos en el ordenador.
        public int Coffe { get; set; }

        // Indica el almacenamiento de Estrés invertidos en el ordenador.
        public int Stress { get; set; }

        // Indica el nivel de minas de Conocimiento del ordenador.
        public int KnowledgeLevel { get; set; }

        // Indica el nivel de minas de Habilidad del ordenador.
        public int IngenyousLevel { get; set; }

        // Indica el nivel de minas de Café del ordenador.
        public int CoffeLevel { get; set; }

        // Indica el nivel de minas de Estrés del ordenador.
        public int StressLevel { get; set; }

        public Computer Computer { get; set; }

        public Resource()
        {
            Knowledge = 1000;
            Ingenyous = 500;
            Coffe = 100;
            Stress = 30;
            KnowledgeLevel = 1;
            IngenyousLevel = 1;
            CoffeLevel = 0;
            StressLevel = 0;
        }
    }
}
