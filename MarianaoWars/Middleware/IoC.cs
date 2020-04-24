using MarianaoWars.Data;
using MarianaoWars.Repositories.Implementations;
using MarianaoWars.Repositories.Interfaces;
using MarianaoWars.Services.Implementations;
using MarianaoWars.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Middleware
{
    public static class IoC
    {
        public static IServiceCollection AddDependency(this IServiceCollection services)
        {
            //repositorios
            services.AddTransient<IRepositoryInstitute, RepositoryInstitute>();

            //servicios
            services.AddTransient<IAsyncPregame, AsyncServicePregame>();
            services.AddTransient<IAsyncLogic, AsyncServiceLogic>();

            return services;
        }

    }
}
