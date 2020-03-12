﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    /**
     * Instituto hace referencia al servidor.
     */
    public class Institute
    {
        
        // ID del Instituto. Primary Key Autoincremental.
        public Guid Id { get; set; }

        // Nombre del servidor.
        public string Name { get; set; }

        // Descripción del servidor.
        public string Description { get; set; }

        // Fecha en la que se inicia el servidor.
        public DateTime InitDate { get; set; }

        // Fecha en la que se cierra el servidor y se termina la partida.
        public DateTime CloseDate { get; set; }

        // Multiplicador de tiempo. Por defecto es 1.
        public double RateTime { get; set; }

        // Multiplicador de precio. Por defecto es 1.
        public double RateCost { get; set; }

        // Indica cada cuantas milésimas de segundo se actualiza la bbdd.
        public int RateUpdate { get; set; }

        // La cantidad máxima de jugadores que permite el servidor
        public int maxJugadores { get; set; }

        // Muestra si el servidor está cerrado. Abierto = false || Close = true
        public bool IsClosed { get; set; }


        public Institute(string name, string description, DateTime initDate, DateTime closeDate, double rateTime, double rateCost, int rateUpdate, int maxJugadores, bool isClosed)
        {
            Name = name;
            Description = description;
            InitDate = initDate;
            CloseDate = closeDate;
            RateTime = rateTime;
            RateCost = rateCost;
            RateUpdate = rateUpdate;
            this.maxJugadores = maxJugadores;
            IsClosed = isClosed;
        }


    }
}
