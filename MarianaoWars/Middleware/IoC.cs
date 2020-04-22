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
            //services.AddScoped<IRepositoryInstitute, RepositoryInstitute>();
            services.AddTransient<IRepositoryInstitute, RepositoryInstitute>();

            

            //servicios
            services.AddScoped<IServiceInstitute, ServiceInstitute>();
            services.AddScoped<IServiceInitGame, ServiceInitGame>();
            services.AddScoped<IServiceResource, ServiceResource>();
            services.AddTransient<IAsyncPregame, AsyncServicePregame>();
            services.AddTransient<IAsyncLogic, AsyncServiceLogic>();

            return services;
        }

    }
}
