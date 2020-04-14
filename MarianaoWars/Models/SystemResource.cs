using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class SystemResource
    {
        // Identificador del Recurso de Sistem.a Primary Key Autoincremental
        public int Id { get; set; }

        // Nombre del Recurso del Sistema.
        public string Name { get; set; }

        // Descripción del Recurso del Sistema.
        public string Description { get; set; }

        // Nivel máximo al que se puede subir la mina.
        public int LastVersion { get; set; }

        // Puntos iniciales que otorga la mina.
        public int BaseDownloads { get; set; }

        // Incremento de los puntos base * nivel de la mina.
        public int PlusDownloads { get; set; }

        // Puntos base de Conocimiento requeridos para construir la mina.
        public int BaseKnowledge { get; set; }

        // Incremento de los puntos base * nivel  de fabricar la mina.
        public double PlusKnowledge { get; set; }

        // Puntos base de Ingenio requeridos para construir la mina.
        public int BaseIngenyous { get; set; }

        // Incremento de los puntos base * nivel  de fabricar la mina.
        public double PlusIngenyous { get; set; }

        // Puntos base de Café requeridos para construir la mina.
        public int BaseCoffe { get; set; }

        // Incremento de los puntos base * nivel  de fabricar la mina.
        public double PlusCoffe { get; set; }

        // Puntos base de Descanso requeridos para construir la mina.
        public int BaseSleep { get; set; }

        // Incremento de los puntos base * nivel  de fabricar la mina.
        public double PlusSleep { get; set; }

        // Puntos base de Conocimiento que otorga la mina
        public int Knowledge { get; set; }

        // Incremento de puntos que otorga la mina.
        public int IncrementKnowledge { get; set; }

        // Puntos base de Conocimiento que otorga la mina
        public int Ingenyous { get; set; }

        // Incremento de puntos que otorga la mina.
        public double IncrementIngenyous { get; set; }

        // Puntos base de Conocimiento que otorga la mina
        public int Coffe { get; set; }

        // Incremento de puntos que otorga la mina.
        public double IncrementCoffe { get; set; }

        // Puntos base de Conocimiento que otorga la mina
        public int Sleep { get; set; }

        // Incremento de puntos que otorga la mina.
        public int IncrementSleep { get; set; }


    }
}
