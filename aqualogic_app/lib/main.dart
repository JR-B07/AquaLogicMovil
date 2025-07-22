import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AquaLogic Móvil',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const MedicionesScreen(),
    );
  }
}

class MedicionesScreen extends StatefulWidget {
  const MedicionesScreen({super.key});

  @override
  _MedicionesScreenState createState() => _MedicionesScreenState();
}

class _MedicionesScreenState extends State<MedicionesScreen> {
  List<dynamic> mediciones = [];
  bool isLoading = true;
  String errorMessage = '';

  Future<void> fetchMediciones() async {
    try {
      // IMPORTANTE: Cambia esta URL según tu entorno
      // - Para emulador Android: http://10.0.2.2:3000
      // - Para iOS/dispositivo físico: http://<tu-ip-local>:3000
      // - Para producción: https://tu-api.com
      const apiUrl = 'http://10.0.2.2:3000/api/mediciones';

      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        setState(() {
          mediciones = json.decode(response.body);
          isLoading = false;
        });
      } else {
        setState(() {
          errorMessage = 'Error al cargar datos: ${response.statusCode}';
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        errorMessage = 'Error de conexión: $e';
        isLoading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    fetchMediciones();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mediciones de Agua'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: fetchMediciones,
          ),
        ],
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : errorMessage.isNotEmpty
          ? Center(child: Text(errorMessage))
          : mediciones.isEmpty
          ? const Center(child: Text('No hay mediciones disponibles'))
          : ListView.builder(
              itemCount: mediciones.length,
              itemBuilder: (context, index) {
                final medicion = mediciones[index];
                return Card(
                  margin: const EdgeInsets.all(8),
                  child: ListTile(
                    title: Text('Sector: ${medicion['sector']}'),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Valor: ${medicion['valor'].toString()}'),
                        if (medicion['fecha'] != null)
                          Text('Fecha: ${medicion['fecha']}'),
                      ],
                    ),
                    trailing: const Icon(Icons.water_drop),
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: fetchMediciones,
        tooltip: 'Actualizar',
        child: const Icon(Icons.refresh),
      ),
    );
  }
}
