const ObservasiService = require("../service/observasiService");
const path = require("path");
const fs = require('fs').promises;

class ObservasiController {
  constructor() {
    this.observasiService = new ObservasiService();
  }

  createObservation = async (req, res) => {
    try {
      const { data_lahan_id, tanggal_kejadian, tanggal_penilaian, skor_akhir } =
        req.body;
  
      const observasi = await this.observasiService.createObservationData(
        data_lahan_id,
        tanggal_kejadian,
        tanggal_penilaian,
        skor_akhir
      );
  
      res.status(200).json({ msg: "berhasil create observasi", observasi });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  createPlot = async (req, res) => {
    try {
      const { observation_id, luasan_plot } = req.body;
  
      const plot = await this.observasiService.createPlotData(observation_id, luasan_plot);
  
      res.status(200).json({ msg: "berhasil create plot", plot });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  createPenilaian = async (req, res) => {
    try {
      const { variable, type, bobot, nilai, deskripsi, kategori } = req.body;
  
      const penilaian = await this.observasiService.createPenilaianData(variable, type, bobot, nilai, deskripsi, kategori);
  
      res.status(200).json({ msg: "berhasil create penilaian", penilaian });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  createPenilaianObservasi = async (req, res) => {
    try {
      const { plot_id, penilaian_id } = req.body;
  
      const penilaianObservasi = await this.observasiService.createPenilaianObservasiData(
        plot_id,
        penilaian_id
      );
  
      res
        .status(200)
        .json({ msg: "berhasil create penilaian observasi", penilaianObservasi });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  createHasil = async (req, res) => {
    try {
      const { plot_id, kondisi_vegetasi, kondisi_tanah, skor } = req.body;
  
      const hasil = await this.observasiService.createHasilData({
        plot_id,
        kondisi_vegetasi,
        kondisi_tanah,
        skor,
      });
  
      res.status(200).json({ msg: "berhasil create hasil", hasil });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  createDokumentasi = async (req, res) => {
    try {
      const { plot_id, type } = req.body;
      const files = req.files;
  
      const dokumentasi = await this.observasiService.createDokumentasiData(plot_id, files, type);
  
      res.status(200).json({ msg: "berhasil create dokumentasi" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  createKarhutla = async (req, res) => {
    try {
      const { data } = req.body;
      // console.log(data)
  
      const result = await this.observasiService.createKarhutlaData(data);
  
      res.status(200).json({ msg: "berhasil create hasil", result });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  getPenilaian = async (req, res) => {
    try {
      const result = await this.observasiService.getPenilaianData()
  
      res.status(200).json({ msg: "berhasil get penilaian", result });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  getImage = async (req, res) => {
    try {
      const fileName = req.params.fileName;

      const filePath = path.join(global.__basedir, 'image', 'upload', fileName);

      // Read the file asynchronously
      const fileContent = await fs.readFile(filePath);

      // Set the appropriate headers for the response
      res.setHeader('Content-Type', 'image/jpeg');

       // Send the file content as the response
      res.send(fileContent);

    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  getImageName = async (req, res) => {
    try {
      const { plot_id, type } = req.body;
      const result = await this.observasiService.getImageName(plot_id, type);

      res.status(200).json({ msg: "berhasil get image name", result });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = ObservasiController;
