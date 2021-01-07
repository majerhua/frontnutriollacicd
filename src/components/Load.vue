<style>
.headline {
  text-align: center;
}
</style>
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290" no-click-animation persistent>
      <v-card>
        <v-card-title class="headline">
          <span style="text-align:center;width:100%;font-weight:bold;">
            <v-alert
              dense
              outlined
              type="error"
              v-if="mErrorEdad"
              style="font-size:0.6em;"
            >Ingrese su edad por favor.</v-alert>

            <v-alert
              dense
              outlined
              type="error"
              v-if="mErrorSexo"
              style="font-size:0.6em;"
            >Ingrese su sexo por favor.</v-alert>Bienvenido
          </span>
        </v-card-title>

        <v-card-text>
          <span
            style="color:#000;font-size:1em;text-align:left;"
          >Hola, antes de comenzar queremos conocer tu sexo y edad</span>
          <v-row>
            <v-col>
              <v-select
                v-model="selectedSexo"
                :items="sexos"
                item-text="Descripcion"
                item-value="Id"
                label="Sexo"
                color="#000"
                style="font-size:1em;"
                return-object
                no-data-text="Cargando datos..."
                :loading="loadingSexo"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                :items="rangoEdades"
                item-text="Descripcion"
                item-value="Id"
                label="Rango Edad"
                color="#000"
                v-model="selectedRangoEdad"
                no-data-text="Cargando datos..."
                style="font-size:1em;"
                return-object
                :loading="loadingEdad"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" style="font-size:0.7em;" @click="confirmEdadSexo()">Ingresar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      mErrorEdad: false,
      mErrorSexo: false,
      loadingSexo: true,
      loadingEdad: true,
      sexos: [],
      rangoEdades: [],
      dialog: true,
      value: 0,
      selectedSexo: 0,
      selectedRangoEdad: 0
    };
  },
  methods: {
    confirmEdadSexo: function() {
      var vm = this;
      if (vm.selectedSexo == 0) {
        //alert("Por favor ingrese su sexo.");
        vm.mErrorSexo = true;
        vm.mErrorEdad = false;
      } else if (vm.selectedRangoEdad == 0) {
        //alert("Por favor ingrese su edad.");
        vm.mErrorEdad = true;
        vm.mErrorSexo = false;
      } else {
        console.log(vm.selectedSexo);
        let objSexoEdad = {
          sexo: { id: vm.selectedSexo.Id, nombre: vm.selectedSexo.Descripcion },
          edad: {
            id: vm.selectedRangoEdad.Id,
            nombre: vm.selectedRangoEdad.Descripcion
          }
        };
        this.$emit("update", objSexoEdad);
        vm.mErrorEdad = false;
        vm.mErrorSexo = false;
        vm.dialog = false;
      }
    }
  },
  mounted() {
    let self = this;
    axios
      .get("https://backnutriollacicd.herokuapp.com/api/sexos")
      .then(function(res) {
        self.sexos = res.data;
        self.loadingSexo = false;
      })
      .catch(function(err) {
        alert(err);
      });

    axios
      .get("https://backnutriollacicd.herokuapp.com/api/rango-edades")
      .then(function(res) {
        self.rangoEdades = res.data.data;
        self.loadingEdad = false;
      })
      .catch(function(err) {
        alert(err);
      });
  }
};
</script>