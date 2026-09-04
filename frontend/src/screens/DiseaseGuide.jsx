import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  Leaf,
  AlertCircle,
} from "lucide-react";
import { COLORS } from "../styles/theme";

const DISEASES = [
  // =====================================================
  // TOMATO
  // =====================================================
  {
    crop: "Tomato",
    disease: "Early Blight",
    classKey: "Tomato_Early_Blight",
    images: [
      "/disease-images/tomato/early-blight-1.jpg",
      "/disease-images/tomato/early-blight-2.jpg",
      "/disease-images/tomato/early-blight-3.jpg",
    ],
    symptoms:
      "Dark spots with concentric rings usually appear on older, lower leaves. Affected leaves may gradually turn yellow and fall.",
    severity: "Medium",
  },
  {
    crop: "Tomato",
    disease: "Tomato Yellow Leaf Curl Virus",
    classKey: "Tomato_Leaf_Curl_Virus",
    images: [
      "/disease-images/tomato/yellow-leaf-curl-virus-1.jpg",
      "/disease-images/tomato/yellow-leaf-curl-virus-2.jpg",
      "/disease-images/tomato/yellow-leaf-curl-virus-3.jpg",
    ],
    symptoms:
      "Leaves may curl upward, become yellow, and show reduced growth. Plants can become noticeably stunted.",
    severity: "High",
  },
  {
    crop: "Tomato",
    disease: "Bacterial Spot",
    classKey: "Tomato_Bacterial_Spot",
    images: [
      "/disease-images/tomato/bacterial-spot-1.jpg",
      "/disease-images/tomato/bacterial-spot-2.jpg",
      "/disease-images/tomato/bacterial-spot-3.jpg",
    ],
    symptoms:
      "Small dark spots can appear on leaves and other plant parts. Severe infection may cause yellowing and leaf loss.",
    severity: "Medium",
  },
  {
    crop: "Tomato",
    disease: "Late Blight",
    classKey: "Tomato_Late_Blight",
    images: [
      "/disease-images/tomato/late-blight-1.jpg",
      "/disease-images/tomato/late-blight-2.jpg",
      "/disease-images/tomato/late-blight-3.jpg",
    ],
    symptoms:
      "Dark, water-soaked lesions can develop on leaves and stems, especially during cool and wet conditions.",
    severity: "High",
  },
  {
    crop: "Tomato",
    disease: "Leaf Mold",
    classKey: "Tomato_Leaf_Mold",
    images: [
      "/disease-images/tomato/leaf-mold-1.jpg",
      "/disease-images/tomato/leaf-mold-2.jpg",
      "/disease-images/tomato/leaf-mold-3.jpg",
    ],
    symptoms:
      "Yellow patches may develop on the upper leaf surface while olive-green or brown fungal growth can appear underneath.",
    severity: "Medium",
  },
  {
    crop: "Tomato",
    disease: "Septoria Leaf Spot",
    classKey: "Tomato_Septoria_Leaf_Spot",
    images: [
      "/disease-images/tomato/septoria-leaf-spot-1.jpg",
      "/disease-images/tomato/septoria-leaf-spot-2.jpg",
      "/disease-images/tomato/septoria-leaf-spot-3.jpg",
    ],
    symptoms:
      "Small circular leaf spots with darker borders can appear, often beginning on older lower leaves.",
    severity: "Medium",
  },
  {
    crop: "Tomato",
    disease: "Spider Mites",
    classKey: "Tomato_Spider_Mites",
    images: [
      "/disease-images/tomato/spider-mites-1.jpg",
      "/disease-images/tomato/spider-mites-2.jpg",
      "/disease-images/tomato/spider-mites-3.jpg",
    ],
    symptoms:
      "Leaves may develop fine speckling, yellowing, or bronzing. Fine webbing may sometimes be visible underneath leaves.",
    severity: "Medium",
  },
  {
    crop: "Tomato",
    disease: "Target Spot",
    classKey: "Tomato_Target_Spot",
    images: [
      "/disease-images/tomato/target-spot-1.jpg",
      "/disease-images/tomato/target-spot-2.jpg",
      "/disease-images/tomato/target-spot-3.jpg",
    ],
    symptoms:
      "Brown circular lesions with target-like rings may appear on leaves and can expand under favorable conditions.",
    severity: "Medium",
  },
  {
    crop: "Tomato",
    disease: "Tomato Mosaic Virus",
    classKey: "Tomato_Mosaic_Virus",
    images: [
      "/disease-images/tomato/mosaic-virus-1.jpg",
      "/disease-images/tomato/mosaic-virus-2.jpg",
      "/disease-images/tomato/mosaic-virus-3.jpg",
    ],
    symptoms:
      "Leaves can develop mottled light and dark green patterns, distortion, and reduced plant growth.",
    severity: "High",
  },

  // =====================================================
  // POTATO
  // =====================================================
  {
    crop: "Potato",
    disease: "Late Blight",
    classKey: "Potato_Late_Blight",
    images: [
      "/disease-images/potato/late-blight-1.jpg",
      "/disease-images/potato/late-blight-2.jpg",
      "/disease-images/potato/late-blight-3.jpg",
    ],
    symptoms:
      "Dark, water-soaked lesions may develop on leaves and spread rapidly during wet conditions.",
    severity: "High",
  },
  {
    crop: "Potato",
    disease: "Early Blight",
    classKey: "Potato_Early_Blight",
    images: [
      "/disease-images/potato/early-blight-1.jpg",
      "/disease-images/potato/early-blight-2.jpg",
      "/disease-images/potato/early-blight-3.jpg",
    ],
    symptoms:
      "Brown lesions with concentric rings commonly develop on older leaves.",
    severity: "Medium",
  },

  // =====================================================
  // MAIZE
  // =====================================================
  {
    crop: "Maize",
    disease: "Cercospora Gray Leaf Spot",
    classKey: "Maize_Cercospora_Gray_Leaf_Spot",
    images: [
      "/disease-images/maize/cercospora-gray-leaf-spot-1.jpg",
      "/disease-images/maize/cercospora-gray-leaf-spot-2.jpg",
      "/disease-images/maize/cercospora-gray-leaf-spot-3.jpg",
    ],
    symptoms:
      "Long, narrow gray to brown lesions develop on leaves and may become more noticeable as infection progresses.",
    severity: "Medium",
  },
  {
    crop: "Maize",
    disease: "Common Rust",
    classKey: "Maize_Common_Rust",
    images: [
      "/disease-images/maize/common-rust-1.jpg",
      "/disease-images/maize/common-rust-2.jpg",
      "/disease-images/maize/common-rust-3.jpg",
    ],
    symptoms:
      "Small reddish-brown to rust-colored pustules appear on the leaf surface.",
    severity: "Medium",
  },
  {
    crop: "Maize",
    disease: "Northern Leaf Blight",
    classKey: "Maize_Northern_Leaf_Blight",
    images: [
      "/disease-images/maize/northern-leaf-blight-1.jpg",
      "/disease-images/maize/northern-leaf-blight-2.jpg",
      "/disease-images/maize/northern-leaf-blight-3.jpg",
    ],
    symptoms:
      "Long, cigar-shaped gray-green or brown lesions can develop across maize leaves.",
    severity: "High",
  },

  // =====================================================
  // APPLE
  // =====================================================
  {
    crop: "Apple",
    disease: "Apple Scab",
    classKey: "Apple_Scab",
    images: [
      "/disease-images/apple/apple-scab-1.jpg",
      "/disease-images/apple/apple-scab-2.jpg",
      "/disease-images/apple/apple-scab-3.jpg",
    ],
    symptoms:
      "Olive-green to dark lesions may appear on leaves and fruit and can become darker as they develop.",
    severity: "Medium",
  },
  {
    crop: "Apple",
    disease: "Black Rot",
    classKey: "Apple_Black_Rot",
    images: [
      "/disease-images/apple/black-rot-1.jpg",
      "/disease-images/apple/black-rot-2.jpg",
      "/disease-images/apple/black-rot-3.jpg",
    ],
    symptoms:
      "Purple or brown leaf spots may develop and gradually enlarge, sometimes forming concentric rings.",
    severity: "High",
  },
  {
    crop: "Apple",
    disease: "Cedar Apple Rust",
    classKey: "Apple_Cedar_Rust",
    images: [
      "/disease-images/apple/cedar-apple-rust-1.jpg",
      "/disease-images/apple/cedar-apple-rust-2.jpg",
      "/disease-images/apple/cedar-apple-rust-3.jpg",
    ],
    symptoms:
      "Yellow-orange spots can develop on leaves, sometimes producing small raised structures on the underside.",
    severity: "Medium",
  },

  // =====================================================
  // CHERRY
  // =====================================================
  {
    crop: "Cherry",
    disease: "Powdery Mildew",
    classKey: "Cherry_Powdery_Mildew",
    images: [
      "/disease-images/cherry/powdery-mildew-1.jpg",
      "/disease-images/cherry/powdery-mildew-2.jpg",
      "/disease-images/cherry/powdery-mildew-3.jpg",
    ],
    symptoms:
      "White, powder-like fungal growth may appear on leaves and young plant tissue.",
    severity: "Medium",
  },

  // =====================================================
  // GRAPE
  // =====================================================
  {
    crop: "Grape",
    disease: "Black Rot",
    classKey: "Grape_Black_Rot",
    images: [
      "/disease-images/grape/black-rot-1.jpg",
      "/disease-images/grape/black-rot-2.jpg",
      "/disease-images/grape/black-rot-3.jpg",
    ],
    symptoms:
      "Small tan or brown leaf spots may develop dark borders and progress during warm, humid conditions.",
    severity: "High",
  },
  {
    crop: "Grape",
    disease: "Esca (Black Measles)",
    classKey: "Grape_Esca",
    images: [
      "/disease-images/grape/esca-1.jpg",
      "/disease-images/grape/esca-2.jpg",
      "/disease-images/grape/esca-3.jpg",
    ],
    symptoms:
      "Leaves may develop characteristic striping or spotting between veins, with affected tissue becoming discolored.",
    severity: "High",
  },
  {
    crop: "Grape",
    disease: "Isariopsis Leaf Spot",
    classKey: "Grape_Isariopsis_Leaf_Spot",
    images: [
      "/disease-images/grape/isariopsis-leaf-spot-1.jpg",
      "/disease-images/grape/isariopsis-leaf-spot-2.jpg",
      "/disease-images/grape/isariopsis-leaf-spot-3.jpg",
    ],
    symptoms:
      "Dark leaf spots can develop and enlarge, causing infected portions of leaves to deteriorate.",
    severity: "Medium",
  },

  // =====================================================
  // PEACH
  // =====================================================
  {
    crop: "Peach",
    disease: "Bacterial Spot",
    classKey: "Peach_Bacterial_Spot",
    images: [
      "/disease-images/peach/bacterial-spot-1.jpg",
      "/disease-images/peach/bacterial-spot-2.jpg",
      "/disease-images/peach/bacterial-spot-3.jpg",
    ],
    symptoms:
      "Small dark spots may appear on leaves and fruit, sometimes surrounded by yellow tissue.",
    severity: "Medium",
  },

  // =====================================================
  // BELL PEPPER
  // =====================================================
  {
    crop: "Bell Pepper",
    disease: "Bacterial Spot",
    classKey: "Bell_Pepper_Bacterial_Spot",
    images: [
      "/disease-images/bell-pepper/bacterial-spot-1.jpg",
      "/disease-images/bell-pepper/bacterial-spot-2.jpg",
      "/disease-images/bell-pepper/bacterial-spot-3.jpg",
    ],
    symptoms:
      "Small dark lesions can appear on leaves and fruit, sometimes surrounded by yellow tissue.",
    severity: "Medium",
  },

  // =====================================================
  // STRAWBERRY
  // =====================================================
  {
    crop: "Strawberry",
    disease: "Leaf Scorch",
    classKey: "Strawberry_Leaf_Scorch",
    images: [
      "/disease-images/strawberry/leaf-scorch-1.jpg",
      "/disease-images/strawberry/leaf-scorch-2.jpg",
      "/disease-images/strawberry/leaf-scorch-3.jpg",
    ],
    symptoms:
      "Dark purple to reddish spots can develop on leaves and may cause affected areas to appear scorched.",
    severity: "Medium",
  },
];

const CROPS = [...new Set(DISEASES.map((item) => item.crop))];

const CROP_EMOJIS = {
  Tomato: "🍅",
  Potato: "🥔",
  Maize: "🌽",
  Apple: "🍎",
  Cherry: "🍒",
  Grape: "🍇",
  Peach: "🍑",
  "Bell Pepper": "🫑",
  Strawberry: "🍓",
};

const SEVERITY_COLOR = {
  Medium: COLORS.amberDeep,
  High: COLORS.danger,
};

export default function DiseaseGuide() {
  const navigate = useNavigate();

  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const cropDiseases = DISEASES.filter(
    (item) => item.crop === selectedCrop
  );

  const openDisease = (disease) => {
    setSelectedDisease(disease);
    setSelectedImageIndex(0);
  };

  const closeDisease = () => {
    setSelectedDisease(null);
    setSelectedImageIndex(0);
  };

  const previousImage = () => {
    setSelectedImageIndex((current) =>
      current === 0
        ? selectedDisease.images.length - 1
        : current - 1
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((current) =>
      current === selectedDisease.images.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <>
      <style>{`
        .dg-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 24px 20px 50px;
        }

        .dg-crop-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .dg-disease-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .dg-crop-btn,
        .dg-disease-card {
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .dg-crop-btn:hover {
          transform: translateY(-2px);
        }

        .dg-disease-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(20, 42, 31, 0.09);
        }

        .dg-image-box {
          width: 100%;
          height: 190px;
          background: #F1F1E8;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .dg-image-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .dg-modal-image {
          width: 100%;
          height: 320px;
          background: #F1F1E8;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }

        .dg-modal-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .dg-image-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 15px 0;
        }

        .dg-nav-button {
          width: 36px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid ${COLORS.line};
          border-radius: 10px;
          background: ${COLORS.cream};
          color: ${COLORS.forest};
          cursor: pointer;
          transition: background 160ms ease, transform 160ms ease;
        }

        .dg-nav-button:hover {
          transform: translateY(-1px);
          background: #EEF2E5;
        }

        .dg-modal {
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          background: #FAF9F2;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }

        @media (min-width: 650px) {
          .dg-crop-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .dg-disease-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1000px) {
          .dg-disease-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 520px) {
          .dg-page {
            padding: 18px 14px 40px;
          }

          .dg-image-box {
            height: 175px;
          }

          .dg-modal-image {
            height: 260px;
          }
        }
      `}</style>

      <div className="dg-page">

        {/* BACK */}
        <button
          onClick={() => navigate("/home")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            border: "none",
            background: "transparent",
            color: COLORS.forest,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            padding: 0,
            marginBottom: 24,
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* HERO */}
        <div
          style={{
            background: COLORS.cream,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 20,
            padding: "24px 22px",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "#E5EDD5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen
                size={23}
                color={COLORS.forest}
              />
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.leaf,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}
              >
                CropSense Reference
              </p>

              <h1
                style={{
                  margin: "3px 0 0",
                  fontFamily: "'Fraunces', serif",
                  fontSize: 30,
                  fontWeight: 600,
                  color: COLORS.forest,
                }}
              >
                Disease Guide
              </h1>
            </div>
          </div>

          <p
            style={{
              margin: "16px 0 0",
              maxWidth: 650,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: COLORS.inkSoft,
            }}
          >
            Learn what common crop diseases can look like before
            scanning your crop. Select a crop below to explore
            reference examples and symptoms.
          </p>
        </div>

        {/* CROP SELECTION */}
        <p
          style={{
            margin: "0 0 11px",
            fontSize: 12.5,
            fontWeight: 700,
            color: COLORS.inkSoft,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          Select a crop
        </p>

        <div
          className="dg-crop-grid"
          style={{ marginBottom: 30 }}
        >
          {CROPS.map((crop) => {
            const selected = crop === selectedCrop;

            return (
              <button
                key={crop}
                className="dg-crop-btn"
                onClick={() => {
                  setSelectedCrop(crop);
                  setSelectedDisease(null);
                  setSelectedImageIndex(0);
                }}
                style={{
                  border: selected
                    ? `2px solid ${COLORS.forest}`
                    : `1px solid ${COLORS.line}`,
                  background: selected
                    ? "#E8F0DD"
                    : COLORS.cream,
                  borderRadius: 14,
                  padding: "13px 10px",
                  cursor: "pointer",
                  textAlign: "center",
                  color: COLORS.forestDeep,
                }}
              >
                <div
                  style={{
                    fontSize: 25,
                    marginBottom: 5,
                  }}
                >
                  {CROP_EMOJIS[crop]}
                </div>

                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                  }}
                >
                  {crop}
                </div>
              </button>
            );
          })}
        </div>

        {/* DISEASE HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 20,
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                color: COLORS.forest,
              }}
            >
              {selectedCrop} diseases
            </p>

            <p
              style={{
                margin: "3px 0 0",
                fontSize: 12,
                color: COLORS.inkSoft,
              }}
            >
              {cropDiseases.length} reference{" "}
              {cropDiseases.length === 1
                ? "example"
                : "examples"}
            </p>
          </div>

          <Leaf
            size={27}
            color={COLORS.leaf}
            opacity={0.6}
          />
        </div>

        {/* DISEASE CARDS */}
        <div className="dg-disease-grid">
          {cropDiseases.map((item) => (
            <button
              key={item.classKey}
              className="dg-disease-card"
              onClick={() => openDisease(item)}
              style={{
                padding: 0,
                overflow: "hidden",
                border: `1px solid ${COLORS.line}`,
                borderRadius: 16,
                background: COLORS.cream,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {/* IMAGE */}
              <div className="dg-image-box">
                <img
                  src={item.images[0]}
                  alt={`${item.crop} - ${item.disease}`}
                />
              </div>

              {/* CARD CONTENT */}
              <div
                style={{
                  padding: "14px 15px 15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 14,
                      lineHeight: 1.3,
                      color: COLORS.ink,
                    }}
                  >
                    {item.disease}
                  </h3>

                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: "#fff",
                      background:
                        SEVERITY_COLOR[item.severity],
                      borderRadius: 20,
                      padding: "4px 7px",
                    }}
                  >
                    {item.severity}
                  </span>
                </div>

                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 11.5,
                    lineHeight: 1.45,
                    color: COLORS.inkSoft,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.symptoms}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 10,
                    fontSize: 11,
                    fontWeight: 700,
                    color: COLORS.leaf,
                  }}
                >
                  View symptoms
                  <ArrowRight size={13} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* =====================================================
            MODAL
        ===================================================== */}
        {selectedDisease && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(20,42,31,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              zIndex: 100,
            }}
            onClick={closeDisease}
          >
            <div
              className="dg-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* LARGE IMAGE */}
              <div className="dg-modal-image">
                <img
                  src={
                    selectedDisease.images[
                      selectedImageIndex
                    ]
                  }
                  alt={`${selectedDisease.disease} reference ${
                    selectedImageIndex + 1
                  }`}
                />
              </div>

              {/* IMAGE NAVIGATION */}
              <div className="dg-image-nav">
                <button
                  className="dg-nav-button"
                  onClick={previousImage}
                  aria-label="Previous image"
                >
                  <ArrowLeft size={15} />
                </button>

                <span
                  style={{
                    minWidth: 90,
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: COLORS.inkSoft,
                  }}
                >
                  Example {selectedImageIndex + 1} of{" "}
                  {selectedDisease.images.length}
                </span>

                <button
                  className="dg-nav-button"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* MODAL CONTENT */}
              <div style={{ padding: 22 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    fontWeight: 700,
                    color: COLORS.leaf,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                  }}
                >
                  {selectedDisease.crop}
                </p>

                <h2
                  style={{
                    margin: "4px 0 14px",
                    fontFamily: "'Fraunces', serif",
                    fontSize: 25,
                    fontWeight: 600,
                    color: COLORS.forest,
                  }}
                >
                  {selectedDisease.disease}
                </h2>

                {/* SYMPTOMS */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    background: "#F1F4E9",
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 18,
                  }}
                >
                  <AlertCircle
                    size={17}
                    color={
                      SEVERITY_COLOR[
                        selectedDisease.severity
                      ]
                    }
                    style={{
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  />

                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        fontWeight: 700,
                        color: COLORS.forestDeep,
                      }}
                    >
                      What to look for
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0",
                        fontSize: 12.5,
                        lineHeight: 1.55,
                        color: COLORS.inkSoft,
                      }}
                    >
                      {selectedDisease.symptoms}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={() => navigate("/scan")}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 7,
                      border: "none",
                      borderRadius: 11,
                      padding: "11px 15px",
                      background: COLORS.forest,
                      color: "#fff",
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <Camera size={15} />
                    Scan Your Crop
                  </button>

                  <button
                    onClick={closeDisease}
                    style={{
                      border: `1px solid ${COLORS.line}`,
                      borderRadius: 11,
                      padding: "11px 15px",
                      background: COLORS.cream,
                      color: COLORS.forestDeep,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}